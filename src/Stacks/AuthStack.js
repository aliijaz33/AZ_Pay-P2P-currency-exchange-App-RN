import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import MainDrawer from './MainDrawer';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
    </Stack.Navigator>
  );
};

export default AuthStack;

// <?php
// function calculateGPA($marks) {


//     if ($marks >= 90) {
//         return 4.0;
//     } elseif ($marks >= 85) {
//         return 3.7;
//     } elseif ($marks >= 80) {
//         return 3.3;
//     } elseif ($marks >= 75) {
//         return 3.0;
//     } elseif ($marks >= 70) {
//         return 2.7;
//     } elseif ($marks >= 65) {
//         return 2.3;
//     } elseif ($marks >= 60) {
//         return 2.0;
//     } elseif ($marks >= 55) {
//         return 1.7;
//     } elseif ($marks >= 50) {
//         return 1.3;
//     } else {
//         return 0.0;
//     }
// }
// $marks = 77;
// $gpa = calculateGPA($marks);

// echo "According to Your marks as $marks, Your GPA is $gpa"
// ?>






// <!-- <?php

// $studentName = "Ali Ijaz";
// $registration = "SP20-BSE-007";


// $absentClasses = 5; 


// if ($absentClasses <= 6) {
//     echo "$studentName $registration is eligible to appear in the WebTech Terminal Exam. Absent are $absentClasses";
// } else {
//     echo "$studentName $registration is not eligible to appear in the WebTech Terminal Exam. Absent are $absentClasses";
// }

// ?> -->





// <!-- <?php
// $firstName = "Ali";
// $lastName = "Ijaz";

// echo "My Name is $firstName $lastName"
// ?> -->