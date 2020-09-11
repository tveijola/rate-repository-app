import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    color: theme.colors.textSecondary,
    borderColor: theme.colors.textSecondary,
  },
  submitButton: {
    display: 'flex',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    textAlign: 'center',
    margin: 20,
    padding: 15,
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username must be at least 2 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput style={styles.input} placeholder='Username' name='username' />
      <FormikTextInput style={styles.input} secureTextEntry={true} placeholder='Password' name='password' />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text
          style={styles.submitButton}
          color='textLight'
        >
          Sign In
            </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {

  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;