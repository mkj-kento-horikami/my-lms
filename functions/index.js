const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.recordURLClick = functions.https.onCall(async (data, context) => {
  const { urlId, userId } = data;
  const urlRef = admin.firestore().collection('urls').doc(urlId);
  const userRef = admin.firestore().collection('users').doc(userId);

  const urlDoc = await urlRef.get();
  const userDoc = await userRef.get();

  if (!urlDoc.exists || !userDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'URLまたはユーザーが見つかりません');
  }

  await urlRef.update({
    viewCount: admin.firestore.FieldValue.increment(1),
    lastViewed: admin.firestore.FieldValue.serverTimestamp()
  });

  await userRef.collection('viewedUrls').doc(urlId).set({
    lastViewed: admin.firestore.FieldValue.serverTimestamp()
  });

  return { success: true };
});

exports.setCustomClaims = functions.https.onCall((data, context) => {
  // 管理者のみがカスタムクレームを設定できるようにする
  if (context.auth.token.admin !== true) {
    return { error: 'Request not authorized. User must be an admin to fulfill request.' };
  }

  // ユーザーのUIDとロールを取得
  const uid = data.uid;
  const role = data.role;

  // カスタムクレームを設定
  return admin.auth().setCustomUserClaims(uid, { role: role })
    .then(() => {
      return { message: `Success! ${role} role has been assigned to the user.` };
    })
    .catch(error => {
      return { error: error.message };
    });
});