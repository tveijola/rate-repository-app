import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInForm onSubmit={onSubmit} />);

      // It seems that the await act(async () => ... ) is unnecessary?
      fireEvent.changeText(getByTestId('usernameInput'), 'elina');
      fireEvent.changeText(getByTestId('passwordInput'), 'password');
      fireEvent.press(getByTestId('signInButton'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'elina',
          password: 'password'
        });
      });

    });
  });
});