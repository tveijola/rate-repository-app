import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = {
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
};

const initialValues = {
  username: '',
  password: '',
};

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

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;