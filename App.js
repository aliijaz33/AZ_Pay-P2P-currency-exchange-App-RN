/* eslint-disable prettier/prettier */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/Stacks/MainStack';
import {UserProvider} from './src/UserContext';
import {CurrencyProvider} from './src/CurrencyContext';
import {LiveCurrencyProvider} from './src/LiveCurrencyContext';
import {MessageNotificationProvider} from './src/MessageNotificationContext';
const App = () => {
  return (
    <LiveCurrencyProvider>
      <UserProvider>
        <CurrencyProvider>
          <MessageNotificationProvider>
            <NavigationContainer>
              <MainStack />
            </NavigationContainer>
          </MessageNotificationProvider>
        </CurrencyProvider>
      </UserProvider>
    </LiveCurrencyProvider>
  );
};

export default App;

// #2844ec
// color: 'rgba(0,100,255,1)',
// fontFamily: 'Poppins Regular',

// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Button,
//   Modal,
// } from 'react-native';
// import React, { useState } from 'react';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// const App = () => {
//   const [originalPrice, setOriginalPrice] = useState(0.00);
//   const [discountPercentage, setDiscountPercentage] = useState(0.00);
//   const [history, setHistory] = useState([]);
//   const [modal, setModal] = useState(false);

//   const OrignailPrice = (txt) => {
//     if (txt >= 0) {
//       setOriginalPrice(txt);
//     }
//   };
//   const DiscountPercentage = (txt) => {
//     if (txt >= 0 && txt <= 100) {
//       setDiscountPercentage(txt);
//     }
//   };
//   const discountedAmount = (originalPrice * discountPercentage / 100).toFixed(2);
//   const youPay = (originalPrice - discountedAmount).toFixed(2);
//   const Save = () => {
//     const discountedAmount = (originalPrice * discountPercentage / 100).toFixed(2);
//     const youPay = (originalPrice - discountedAmount).toFixed(2);
//     const values = { originalPrice, discountPercentage, youPay, discountedAmount };
//     const newHistory = [...history, values];
//     setHistory(newHistory);

//   };

//   const ViewHistory = () => {
//     setModal(true);
//   };

//   const History = ({ history }) => {
//     return (
//       <Modal
//         animationType='slide'
//         visible={modal}
//         onRequestClose={() => setModal(false)}
//       >

//         <View style={styles.modalView}>
//           <Text style={styles.historyText}>History</Text>
//           <View style={styles.history}>
//             <Text style={styles.titelText}>Original Price</Text>
//             <Text style={styles.titelText}>-</Text>
//             <Text style={styles.titelText}>Discount</Text>
//             <Text style={styles.titelText}>=</Text>
//             <Text style={styles.titelText}>Final Price</Text>
//           </View>
//           {history.map((item, index) => {
//             return (
//               <View style={styles.history} key={index}>
//                 {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{index + 1}.</Text> */}
//                 <Text style={{ color: 'black', fontSize: 15 }}>{item.originalPrice}</Text>
//                 <Text style={{ color: 'black', fontSize: 15 }}>{item.discountPercentage} %</Text>
//                 <Text style={{ color: 'black', fontSize: 15 }}>{item.youPay}</Text>
//               </View>)
//           })}
//           <Button title='Close' onPress={() => setModal(false)} />
//         </View>
//       </Modal >
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.heading}>Discount Calculator</Text>
//       </View>
//       <Text style={styles.label}>Original Price</Text>
//       <TextInput
//         onChangeText={OrignailPrice}
//         style={styles.input}
//         placeholder="Enter Original Price"
//         value={originalPrice}
//         keyboardType='numeric'
//       />
//       <Text style={styles.label}>Discount Percentage</Text>
//       <View style={styles.input}>
//         <TextInput
//           onChangeText={DiscountPercentage}
//           style={{ fontSize: 20 }}
//           placeholder="Enter Discount Percentage"
//           value={discountPercentage}
//           keyboardType='numeric'
//         />
//         <FontAwesome5 style={{ alignSelf: 'flex-end', marginTop: '-9%', marginBottom: '4%', marginRight: '3%' }} name='percent' size={20} color='black' />
//       </View>

//       <TouchableOpacity
//         onPress={Save}
//         style={styles.btn}>
//         <Text style={styles.btnTxt}>Save to History</Text>
//       </TouchableOpacity>

//       <View style={styles.container2}>
//         <View style={styles.textContainers}>
//           <Text style={styles.text}>You Save</Text>
//           <Text style={styles.text}>Final Price</Text>
//         </View>
//         <View style={styles.textContainers}>
//           <Text style={styles.countedPriceText}>Rs {discountedAmount}</Text>
//           <Text style={styles.countedPriceText}>Rs {youPay}</Text>
//         </View>
//       </View>

//       <TouchableOpacity
//         onPress={ViewHistory}
//         style={styles.btn}>
//         <Text style={styles.btnTxt}>View History</Text>
//       </TouchableOpacity>
//       <History history={history} />
//     </View>
//   );
// };

// export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: 'rgba(160,0,70,0.6)',
//   },
//   header: {
//     width: '100%',
//     height: 60,
//     backgroundColor: 'rgba(100, 15, 150, 0.8)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   heading: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: 'white',
//     fontFamily: 'lucida grande',
//   },
//   label: {
//     fontSize: 18,
//     color: 'black',
//     alignSelf: 'flex-start',
//     marginTop: 10,
//     marginLeft: '8%',
//   },
//   input: {
//     width: '85%',
//     marginTop: 5,
//     backgroundColor: 'white',
//     fontSize: 20,
//     justifyContent: 'center',
//   },
//   btn: {
//     width: '85%',
//     height: 50,
//     marginTop: 19,
//     backgroundColor: 'rgba(100, 15, 150, 0.85)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btnTxt: {
//     color: 'white',
//     fontSize: 18,
//   },
//   container2: {
//     marginTop: 40,
//     borderRadius: 10,
//     width: '85%',
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     height: 150,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textContainers: {
//     width: '30%',
//     height: '100%',
//     marginTop: '5%',
//     marginLeft: '5%',
//   },
//   text: {
//     color: 'black',
//     fontSize: 15,
//     marginBottom: '20%',
//   },
//   countedPriceText: {
//     color: 'black',
//     fontSize: 17,
//     marginBottom: '16%',
//     fontWeight: 'bold',
//   },
//   modalView: {
//     alignItems: 'center',
//   },
//   historyText: {
//     color: 'black',
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
//   history: {
//     width: '100%',
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   titelText: {
//     color: 'black',
//     fontSize: 20,
//     marginBottom: 10,
//   }
// });

// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import React, { useState } from 'react';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { Input } from 'react-native-elements';

// const App = () => {
//   const [name, setName] = useState('');
//   const [gpa, setGPA] = useState(0);
//   const [history, setHistory] = useState([]);
//   const [search, setSearch] = useState('');

//   const searchStdnt = () => {
//     const findStdnt = history.filter(
//       (x) =>
//         x.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setHistory(findStdnt);
//   };

//   const Save = () => {
//     const values = { name, gpa };
//     const newHistory = [...history, values];
//     setHistory(newHistory);

//   };
//   const removeStdnt = (index) => {
//     const student = [...history];
//     student.splice(index, 1);
//     setHistory(student);
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Name:</Text>
//       <TextInput
//         onChangeText={(txt) => {
//           setName(txt);
//         }}
//         style={styles.input}
//         placeholder="Enter Name"
//         value={name}
//       />
//       <Text style={styles.label}>Name:</Text>
//       <TextInput
//         onChangeText={(txt) => {
//           setGPA(txt);
//         }} style={styles.input}
//         placeholder="Enter GPA"
//         value={gpa}
//       />

//       <View style={{ flexDirection: 'row', height: 70, justifyContent: 'space-evenly' }}>
//         <TouchableOpacity
//           onPress={Save}
//           style={styles.btn}
//         >
//           <Text style={styles.btnTxt}>ADD</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={searchStdnt}
//           style={styles.btn}
//         >
//           <Text style={styles.btnTxt}>Search</Text>
//         </TouchableOpacity>
//       </View>

//       <Input
//         onChangeText={setSearch}
//         style={styles.input}
//         placeholder="Search by Name"
//         value={search}
//       />

//       <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '90%', }} />
//       <Text style={styles.label}>Records:</Text>

//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         {history.map((item, index) => {
//           return (
//             <View style={styles.stdntList} key={index}>
//               <View style={{ flexDirection: 'row' }}>
//                 <Text style={styles.listText}>{index + 1}.</Text>
//                 <Text style={styles.listText}>Name: {item.name}</Text>
//                 <Text style={styles.listText}>GPA: {item.gpa}</Text>
//               </View>
//               <View>
//                 <TouchableOpacity onPress={removeStdnt} style={styles.cross}><Entypo name='cross' size={35} color='black' /></TouchableOpacity>
//               </View>
//             </View>)
//         })}
//       </ScrollView>
//       <TouchableOpacity
//         onPress={Save}
//         style={[styles.btn, { alignSelf: 'center', marginBottom: 5, width: '25%' }]}
//       >
//         <Text style={styles.btnTxt}>Clear All</Text>
//       </TouchableOpacity>
//       <View style={{ borderBottomColor: 'gray', marginBottom: 15, borderBottomWidth: 1, width: '90%', }} />

//     </View>
//   );
// };

// export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.08)',
//     paddingLeft: '5%',
//   },
//   label: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginBottom: 2,
//     paddingTop: '3%',
//   },
//   input: {
//     width: '90%',
//     marginTop: 5,
//     backgroundColor: 'white',
//     fontSize: 18,
//   },
//   btn: {
//     width: '20%',
//     height: 40,
//     marginTop: 19,
//     backgroundColor: 'gray',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btnTxt: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   stdntList: {
//     flexDirection: 'row',
//     width: '90%',
//     height: 50,
//     backgroundColor: 'green',
//     alignItems: 'center',
//     borderRadius: 25,
//     marginTop: '3%',
//     justifyContent: 'space-between',
//   },
//   listText: {
//     fontSize: 15,
//     color: 'black',
//     marginLeft: 15,
//     fontWeight: 'bold',
//   },
//   cross: {
//     backgroundColor: 'red',
//     height: 50,
//     width: 65,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignContent: 'flex-end'
//   }
// });
