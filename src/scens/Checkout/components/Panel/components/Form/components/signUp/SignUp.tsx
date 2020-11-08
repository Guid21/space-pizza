import React, { useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { IInitialValues } from '../../Form';
import Input from '../../../../../../../../shared/components/Input';

interface ISignUp {
  values: IInitialValues;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  touched: IInitialValues;
  errors: IInitialValues;
  setValues: (
    values: React.SetStateAction<IInitialValues>,
    shouldValidate?: boolean | undefined
  ) => any;
}

const SignUp = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setValues,
}: ISignUp) => {
  const [isRegistration, setIsRegistration] = useState(false);

  const [user, loading] = useAuthState(firebase.auth());

  const reqister = useMemo(() => {
    if (isRegistration) {
      return (
        <>
          <div className="app-input lg:col-span-3">
            <Input
              title="PASSWORD"
              name="signUp.password"
              placeholder="8+ symbols"
              type="password"
              textError={
                (touched.signUp?.password && errors.signUp?.password) ||
                undefined
              }
              autoComplete="new-password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.signUp?.password || undefined}
              required
              my2={false}
            />
          </div>
          <div className="app-input lg:col-span-3">
            <Input
              title="PASSWORD (AGAIN)"
              name="signUp.repeatPassword"
              placeholder="Helps prevent typos"
              type="password"
              textError={
                (touched.signUp?.repeatPassword &&
                  errors.signUp?.repeatPassword) ||
                undefined
              }
              autoComplete="new-password"
              id="repeatPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.signUp?.repeatPassword || undefined}
              required
              my2={false}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="flex items-center my-2 text-gray-500">
              <input
                checked={values.signUp?.policy || undefined}
                onChange={handleChange}
                name="signUp.policy"
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
            </label>{' '}
            <div className="mt-3 text-xs italic text-red-600"></div>
          </div>
        </>
      );
    }

    return null;
  }, [
    isRegistration,
    errors.signUp?.password,
    errors.signUp?.repeatPassword,
    touched.signUp?.password,
    touched.signUp?.repeatPassword,
    values.signUp?.password,
    values.signUp?.policy,
    values.signUp?.repeatPassword,
    handleBlur,
    handleChange,
  ]);

  useEffect(() => {
    if (isRegistration) {
      setValues(
        {
          ...values,
          signUp: { password: '', repeatPassword: '', policy: false },
        },
        true
      );
    } else {
      setValues({ ...values, signUp: null }, true);
    }

    // eslint-disable-next-line
  }, [isRegistration, setValues]);

  useEffect(() => {
    !loading && setIsRegistration(!user);

    // eslint-disable-next-line
  }, [loading]);

  if (user) return null;
  return (
    <>
      <div className="md:col-span-2 lg:col-span-3">
        <label className="flex items-center my-2 text-gray-500">
          <input
            type="checkbox"
            className="top-0 leading-loose text-gray-600 form-checkbox"
            checked={isRegistration}
            onChange={() => setIsRegistration((prev) => !prev)}
          />{' '}
          <span className="ml-2 text-sm text-left text-gray-600">
            Create account
          </span>
        </label>
      </div>
      {reqister}
    </>
  );
};

export default SignUp;
