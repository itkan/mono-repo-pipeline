mkdir web-service
cd web-service

npm init
npx express-generator --no-view src

cd src
npm install
npm audit fix --force
npm install swagger-ui-express pg dotenv
npm install swagger-autogen jest supertest --save-dev

DEBUG=src:* npm start