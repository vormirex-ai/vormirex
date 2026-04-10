const fs = require('fs');

const collectionPath = './vormirex_api_v2_postman_collection.json';
let data;
try {
  data = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));
} catch (e) {
  console.error("Failed to read postman collection:", e);
  process.exit(1);
}

// Helper to find folder
function getFolder(folderName) {
  let folder = data.item.find((i) => i.name === folderName);
  if (!folder) {
    folder = { name: folderName, item: [] };
    data.item.push(folder);
  }
  return folder;
}

// Helper to generate a Postman request item
function createRequest(name, method, paths, authType, bodyContent, formDataKey = null) {
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

  if (formDataKey) {
    req.request.body = {
      mode: 'formdata',
      formdata: [
        {
          key: formDataKey,
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

// Helper to add or replace request inside a folder
function inject(folderName, reqConfig) {
  const folder = getFolder(folderName);
  const existingIndex = folder.item.findIndex(
    (i) => i.name === reqConfig.name || 
    (i.request && i.request.method === reqConfig.request.method && i.request.url.path.join('/') === reqConfig.request.url.path.join('/'))
  );
  
  if (existingIndex >= 0) {
    // Replace to fix any subtle issues (like incorrect formData keys)
    folder.item[existingIndex] = reqConfig;
    console.log(`Updated existing: [${folderName}] ${reqConfig.name}`);
  } else {
    folder.item.push(reqConfig);
    console.log(`Added: [${folderName}] ${reqConfig.name}`);
  }
}

// 1. Fix "Upload Profile Photo" (Needs key "photo" not "file")
inject('User Settings', createRequest('Upload Profile Photo', 'POST', ['api', 'users', 'me', 'profile-photo'], 'user', null, 'photo'));

// 2. Add "Delete Profile Photo"
inject('User Settings', createRequest('Remove Profile Photo', 'DELETE', ['api', 'users', 'me', 'profile-photo'], 'user'));

// 3. Add Guest Login Routes
inject('Auth', createRequest('Request Guest OTP', 'POST', ['api', 'auth', 'guest', 'send-otp'], null, { email: "guest@example.com" }));
inject('Auth', createRequest('Verify Guest OTP', 'POST', ['api', 'auth', 'guest', 'verify-otp'], null, { email: "guest@example.com", code: "123456" }));


fs.writeFileSync(collectionPath, JSON.stringify(data, null, '\t'));
console.log('Postman collection successfully synced!');
