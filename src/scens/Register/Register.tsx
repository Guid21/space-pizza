import React, { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import firebase from 'firebase';
import * as Yup from 'yup';

import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';

const initialValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  policy: false,
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Minimum of 3 characters')
    .required('This field is required'),
  email: Yup.string()
    .email('Enter valid Email')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'Minimum of 8 characters')
    .required('This field is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords don't match")
    .required('This field is required'),
  policy: Yup.boolean().required(),
});

const Register = () => {
  const history = useHistory();

  // TODO Put it in the left hook
  const [user] = useAuthState(firebase.auth());

  const onSubmit = useCallback(
    async ({ name, email, password }) => {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser?.updateProfile({ displayName: name });
      history.push('/');
    },
    [history]
  );

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  if (user) {
    history.push('/');
  }

  return (
    <div className="container max-w-2xl mx-auto py-4">
      <div className="w-full my-12 section">
        <h1 className="my-12 text-4xl">Register</h1>
        <form onSubmit={handleSubmit}>
          <Input
            title="YOUR NAME"
            name="name"
            placeholder="John Doe"
            textError={touched.name ? errors.name : undefined}
            id="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <Input
            title="EMAIL"
            name="email"
            placeholder="johndoe@example.com"
            textError={touched.email ? errors.email : undefined}
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <Input
            title="PASSWORD"
            name="password"
            placeholder="8+ symbols"
            type="password"
            textError={touched.password ? errors.password : undefined}
            autoComplete="new-password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <Input
            title="PASSWORD (AGAIN)"
            name="repeatPassword"
            placeholder="Helps prevent typos"
            type="password"
            textError={
              touched.repeatPassword ? errors.repeatPassword : undefined
            }
            autoComplete="new-password"
            id="repeatPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.repeatPassword}
          />
          <div className="w-full my-2">
            <label className="flex items-center my-2 text-gray-500">
              <input
                checked={values.policy}
                onChange={handleChange}
                name="policy"
                type="checkbox"
                className="top-0 leading-loose text-gray-600 form-checkbox"
              />{' '}
              <span className="ml-2 text-sm text-left text-gray-600">
                I've read and agreed{' '}
                <Link
                  to="#"
                  className="font-semibold text-black border-b-2 border-orange-200 hover:border-orange-500"
                >
                  Privacy policy
                </Link>
              </span>
            </label>
            <div className="mt-3 text-xs italic text-red-600"></div>
          </div>
          <div className="flex flex-col justify-between md:flex-row-reverse">
            <div className="w-full md:ml-2 mb-2">
              <Button
                type="primary"
                disabled={
                  !values.name ||
                  !values.email ||
                  !values.password ||
                  !values.repeatPassword ||
                  !values.policy ||
                  Object.keys(errors).length > 0
                }
                className="h-full"
                htmlType="submit"
                boold
              >
                Sign up
              </Button>
            </div>
            <Link to="/auth" className="w-full md:mr-2 mb-2">
              <Button black>I have an account</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
