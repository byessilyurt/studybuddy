# StudyBuddy

Try it out on: [LINK](https://studybuddy-7fd62.web.app/)

StudyBuddy is a web application that connects students to work together synchronously on their studies. The app matches users with other students and provides a chatbox for real-time communication. StudyBuddy aims to help students boost their productivity, stay motivated, and enhance their learning experience by connecting them with like-minded peers.

## Features

- User authentication (sign up, log in, log out)
- Matching users based on their online status
- Real-time chat functionality
- Timer displaying the duration of the match
- End match functionality to disconnect users
- Responsive and modern UI

## Technologies Used

- React
- Firebase
- Framer Motion
- Tailwind CSS
- React Router

## Installation

1.  Clone the repository:

bashCopy code

`git clone https://github.com/byessilyurt/StudyBuddy.git`

2.  Change directory to the project folder:

bashCopy code

`cd StudyBuddy`

3.  Install dependencies:

bashCopy code

`npm install`

4.  Set up Firebase configuration by creating a `.env` file in the root folder with the following variables:

makefileCopy code

`REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id`

5.  Run the development server:

bashCopy code

`npm start`

The application should now be running on `http://localhost:3000`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
