import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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
    color: theme.colors.textLight,
    fontWeight: theme.fontWeights.bold,
    borderRadius: 4,
    textAlign: 'center',
    margin: 20,
    padding: 15,
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository owner's username is required!"),
  repositoryName: yup
    .string()
    .required("Repository name is required!"),
  rating: yup
    .number()
    .min(0, "Rating must be at least 0!")
    .max(100, "Rating can be at most 100!")
    .integer("Rating must be an integer!")
    .typeError("Rating must be a number!")
    .required("Rating is required!"),
  text: yup
    .string()
    .optional()
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput style={styles.input} placeholder='Repository owner username' name='ownerName' testID='usernameInput' />
          <FormikTextInput style={styles.input} placeholder='Repository name' name='repositoryName' testID='repositorynameInput' />
          <FormikTextInput style={styles.input} placeholder='Rating between 0 and 100' name='rating' testID='ratingInput' />
          <FormikTextInput style={styles.input} placeholder='Review text' name='text' testID='reviewInput' multiline={true} />
          <TouchableWithoutFeedback onPress={handleSubmit} testID='createReviewButton'>
            <Text style={styles.submitButton}>
              Create Review
            </Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};

const CreateReview = () => {

  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    try {
      const { data } = await createReview({ repositoryName, ownerName, rating, text });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;

};

export default CreateReview;