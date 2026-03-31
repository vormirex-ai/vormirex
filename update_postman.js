const fs = require('fs');

const collectionPath = './vormirex_api_v2_postman_collection.json';
const data = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

// Helper to find or create a folder
function getFolder(folderName) {
  let folder = data.item.find((i) => i.name === folderName);
  if (!folder) {
    folder = { name: folderName, item: [] };
    data.item.push(folder);
  }
  return folder;
}

// Helper to generate a Postman request item
function createRequest(name, method, paths, authType, bodyContent, isFormData = false) {
  const req = {
    name,
    request: {
      method: method.toUpperCase(),
      header: [],
      url: {
        raw: `{{baseUrl}}/${paths.join('/')}`,
        host: ['{{baseUrl}}'],
        path: paths,
      },
    },
    response: [],
  };

  if (authType === 'user') {
    req.request.header.push({ key: 'Authorization', value: 'Bearer {{userToken}}', type: 'text' });
  } else if (authType === 'admin') {
    req.request.header.push({ key: 'Authorization', value: 'Bearer {{adminToken}}', type: 'text' });
  }

  if (isFormData) {
    req.request.body = {
      mode: 'formdata',
      formdata: [
        {
          key: 'file',
          type: 'file',
          src: []
        }
      ]
    };
  } else if (bodyContent) {
    req.request.body = {
      mode: 'raw',
      raw: JSON.stringify(bodyContent, null, 2),
      options: { raw: { language: 'json' } },
    };
  }

  return req;
}

// Helper to add request to folder if it doesn't already exist
function inject(folderName, reqConfig) {
  const folder = getFolder(folderName);
  const exists = folder.item.some(
    (i) => i.name === reqConfig.name || 
    (i.request && i.request.method === reqConfig.request.method && i.request.url.path.join('/') === reqConfig.request.url.path.join('/'))
  );
  if (!exists) {
    folder.item.push(reqConfig);
    console.log(`Added: [${folderName}] ${reqConfig.name}`);
  }
}

// --- MISSING ENDPOINTS INJECTION ---

// AUTH
inject('Auth', createRequest('Verify Email', 'GET', ['api', 'auth', 'verify-email']));
inject('Auth', createRequest('Forgot Password', 'POST', ['api', 'auth', 'forgot-password'], null, { email: "test@example.com" }));
inject('Auth', createRequest('Reset Password', 'POST', ['api', 'auth', 'reset-password'], null, { token: "abc", password: "newpassword" }));
inject('Auth', createRequest('Resend Verification', 'POST', ['api', 'auth', 'resend-verification'], null, { email: "test@example.com" }));
inject('Auth', createRequest('Refresh Token', 'POST', ['api', 'auth', 'refresh']));
inject('Auth', createRequest('Logout', 'POST', ['api', 'auth', 'logout'], 'user'));
inject('Auth', createRequest('Get Current Profile', 'GET', ['api', 'auth', 'me'], 'user'));

// COURSES
inject('Courses', createRequest('Update Course (Admin)', 'PATCH', ['api', 'courses', '{{courseId}}'], 'admin', { title: "Updated Title", price: 5000 }));
inject('Courses', createRequest('Delete Course (Admin)', 'DELETE', ['api', 'courses', '{{courseId}}'], 'admin'));
inject('Courses', createRequest('Publish Course (Admin)', 'POST', ['api', 'courses', '{{courseId}}', 'publish'], 'admin'));
inject('Courses', createRequest('Unpublish Course (Admin)', 'POST', ['api', 'courses', '{{courseId}}', 'unpublish'], 'admin'));
inject('Courses', createRequest('Upload Course Media (Admin)', 'POST', ['api', 'courses', '{{courseId}}', 'media', '{{mediaField}}'], 'admin', null, true));

// USER SETTINGS
inject('User Settings', createRequest('Upload Profile Photo', 'POST', ['api', 'users', 'me', 'profile-photo'], 'user', null, true));

// NOTIFICATIONS
inject('Notifications', createRequest('Get My Notifications', 'GET', ['api', 'notifications'], 'user'));
inject('Notifications', createRequest('Mark All As Read', 'PATCH', ['api', 'notifications', 'read-all'], 'user'));
inject('Notifications', createRequest('Mark Single As Read', 'PATCH', ['api', 'notifications', '{{notificationId}}', 'read'], 'user'));


fs.writeFileSync(collectionPath, JSON.stringify(data, null, '\t'));
console.log('Collection updated successfully.');
