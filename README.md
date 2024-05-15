<!-- PROJECT LOGO -->
<h1>
  <div  align="center">
  <a  href="https://github.com/inupaUdara/gym-management-system">
      <img  src="https://github.com/inupaUdara/gym-management-system/blob/final/client/src/assets/cjgym.png"  alt="Logo" >
  </a>
</h1>
<p align=center>Gym Management System</p>
<br>

## Project Description
The gym management system for CJ gym offers a comprehensive solution using MERN stack. It  manages members, schedules, staff, subscriptions, finances, inventory, supplements, and provides personalized coaching. This helps streamline gym operations, boost member engagement, and grow the business.


## Getting started

### 1. Clone the `mern-stack` repository

**If you want to use Expo for developing mobile app, please check out the [expo](https://github.com/t-ho/mern-stack/tree/expo) branch and see instructions [here](https://github.com/t-ho/mern-stack/blob/expo/README.md)**

```bash
git clone https://github.com/t-ho/mern-stack.git
cd mern-stack
cp .env.example .env
cp client/.env.example client/.env
cp mobile/.env.example mobile/.env
# Edit all three .env files to meet your requirements
```

### 2. Install package dependencies

In the `root` directory, run:

```bash
npm install
```

### 3. Start development servers

To start `server`, `client`, and `mobile`, run:

```bash
# In the root directory (mern):
npm start
# Server API is running at http://localhost:SERVER_PORT (http://localhost:8861 by default)
# Web client is running at http://localhost:PORT (http://localhost:3000 by default)
# Mobile - Expo DevTools is running at http://localhost:19002
```

**NOTE:**

- **For the sake of simplicity, we use free service [ngrok](https://ngrok.com/) to create a public API URL for mobile development. The downside of this approach is that the public URL is only available for 8 hours, so we need to restart the npm process every 8 hours.**
- **After 8 hours, the `mobile` process will be terminated, and a warning message will be displayed in your terminal to remind you to restart npm process.**

To restart npm process (_If you don't start the mobile development process, ignore this step_):

```bash
# In your current terminal, press Ctrl + C to exit. Then run
npm start # start server, client and mobile dev process
# or
npm run server:mobile # start server and mobile dev process
```

Or to start `server` and `client` only, run:

```bash
# In the root directory (mern):
npm run server:client
# Server API is running at http://localhost:SERVER_PORT (http://localhost:8861 by default)
# Web client is running at http://localhost:PORT (http://localhost:3000 by default)
```

Or to start `server` and `mobile` only, run:

```bash
# In the root directory (mern):
npm run server:mobile
# Server API is running at http://localhost:SERVER_PORT (http://localhost:8861 by default)
```

### 4. Run the mobile app in your emulator/simulator

```bash
cd mobile
npx react-native run-android
# or
npx react-native run-ios
```







