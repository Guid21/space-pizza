import React, { useCallback, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import firebase from 'firebase';
import * as Yup from 'yup';

import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter valid Email')
    .required('This field is required'),
  password: Yup.string().required('This field is required'),
});

const Login = () => {
  const history = useHistory();

  // TODO Put it in the left hook
  const [user] = useAuthState(firebase.auth());

  const [isRemember, setRemember] = useState(true);

  const onSubmit = useCallback(
    async ({ email, password }) => {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push('/history');
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
        <h1 className="my-12 text-4xl">Login</h1>
        <form onSubmit={handleSubmit}>
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
            placeholder="Nobody knows"
            type="password"
            textError={touched.password ? errors.password : undefined}
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <div className="flex justify-between my-4">
            {/*  TODO make workers Remember me */}
            <label className="inline-flex items-center font-bold">
              <input
                type="checkbox"
                checked={isRemember}
                onChange={() => setRemember((prev) => !prev)}
                className="text-gray-600 form-checkbox"
              />{' '}
              <span className="ml-2 text-sm leading-snug text-gray-600">
                Remember me
              </span>
            </label>{' '}
            {/*  TODO make workers Forgot password */}
            <div className="block font-bold text-orange-500">
              <Button type="link">Forgot password?</Button>
            </div>
          </div>
          <div className="flex flex-col justify-between md:flex-row-reverse">
            <div className="w-full md:ml-2 mb-2">
              <Button
                type="primary"
                disabled={!values.email || !values.password}
                className="h-full"
                htmlType="submit"
                boold
              >
                Sign in
              </Button>
            </div>
            <Link to="/auth/register" className="w-full md:mr-2 mb-2">
              <Button black>Create an account</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
