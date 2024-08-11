const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let userId = ['A111', 'B222', 'C333', 'D444'];
let userPass = ['111', '222', '333', '444'];
let attempts = 0;
const maxAttempts = 3;

const askCredentials = () => {
  rl.question('Enter user ID: ', (enteredUserId) => {
    rl.question('Enter password: ', (enteredPassword) => {
      attempts++;
      let accessGranted = false;

      for (let i = 0; i < userId.length; i++) {
        if (userId[i] === enteredUserId && userPass[i] === enteredPassword) {
          accessGranted = true;
          break;
        }
      }

      if (accessGranted) {
        console.log('Access granted');
        showMenu();
      } else {
        if (attempts < maxAttempts) {
          console.log('Incorrect credentials. Please try again.');
          askCredentials();
        } else {
          console.log('Maximum attempts reached. Access denied.');
          rl.close();
        }
      }
    });
  });
};

const showMenu = () => {
  console.log('\nChoose an option:');
  console.log('1. Add new credentials');
  console.log('2. Update existing credentials');
  console.log('3. Remove credentials');
  console.log('4. Display all credentials');
  console.log('5. Exit');

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        addCredentials();
        break;
      case '2':
        updateCredentials();
        break;
      case '3':
        removeCredentials();
        break;
      case '4':
        displayCredentials();
        break;
      case '5':
        console.log('Exiting...');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        showMenu();
        break;
    }
  });
};

const addCredentials = () => {
  rl.question('Enter new user ID: ', (newUserId) => {
    rl.question('Enter new password: ', (newPassword) => {
      userId.push(newUserId);
      userPass.push(newPassword);
      console.log('New credentials added successfully.');
      showMenu();
    });
  });
};

const updateCredentials = () => {
  rl.question('Enter the user ID to update: ', (existingUserId) => {
    const index = userId.indexOf(existingUserId);

    if (index !== -1) {
      rl.question('Enter new password: ', (newPassword) => {
        userPass[index] = newPassword;
        console.log('Password updated successfully.');
        showMenu();
      });
    } else {
      console.log('User ID not found.');
      showMenu();
    }
  });
};

const removeCredentials = () => {
  rl.question('Enter the user ID to remove: ', (existingUserId) => {
    const index = userId.indexOf(existingUserId);

    if (index !== -1) {
      userId.splice(index, 1);
      userPass.splice(index, 1);
      console.log('Credentials removed successfully.');
      showMenu();
    } else {
      console.log('User ID not found.');
      showMenu();
    }
  });
};

const displayCredentials = () => {
  console.log('\nAvailable Credentials:');
  for (let i = 0; i < userId.length; i++) {
    console.log(`User ID: ${userId[i]}, Password: ${userPass[i]}`);
  }
  showMenu();
};

askCredentials();
