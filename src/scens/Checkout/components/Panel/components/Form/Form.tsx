import React, { FC, useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextArea from '../../../../../../shared/components/TextArea';
import Select from '../../../../../../shared/components/Select';
import Input from '../../../../../../shared/components/Input';
import { country, state } from './utils';
import SignUp from './components/signUp';
import Button from '../../../../../../shared/components/Button';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { CartActions } from '../../../../../../store/cart/cart.actions';
import { useHistory } from 'react-router-dom';
import { Store } from '../../../../../../store';
import AddressList from './components/AddressList';

interface ISignUp {
  password: string;
  repeatPassword: string;
  policy: boolean;
}

export interface IInitialValues {
  name: string;
  email: string;
  country: string;
  state: string;
  city: string;
  address: string;
  paymentMethod: string;
  signUp: ISignUp | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum of 3 characters')
    .required('This field is required'),
  email: Yup.string()
    .email('Enter valid Email')
    .required('This field is required'),
  country: Yup.string().required('This field is required'),
  state: Yup.string().required('This field is required'),
  city: Yup.string()
    .min(3, 'Minimum of 3 characters')
    .required('This field is required'),
  address: Yup.string()
    .min(8, 'Minimum of 8 characters')
    .required('This field is required'),
  paymentMethod: Yup.string().required('This field is required'),
  signUp: Yup.object()
    .default(null)
    .nullable()
    .shape({
      password: Yup.string()
        .min(8, 'Minimum of 8 characters')
        .required('This field is required'),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords don't match")
        .required('This field is required'),
      policy: Yup.boolean().required(),
    }),
});

const initialValues: IInitialValues = {
  name: '',
  email: '',
  country: '',
  state: '',
  city: '',
  address: '',
  paymentMethod: '',
  signUp: null,
};

const Form: FC<unknown> = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user] = useAuthState(firebase.auth());

  const {
    cart: { data: cart },
    currency: {
      data: { selectedCurrency: currency },
    },
  } = useSelector((state: Store) => state);

  const onSubmit = useCallback(
    async (order) => {
      if (user) {
        await firebase
          .firestore()
          .collection(user.uid)
          .add({ ...order, cart, currency, date: new Date().toISOString() });
      }

      dispatch({ type: CartActions.ClearCart });

      history.push('/history');
    },
    [user, dispatch, history, currency, cart]
  );

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    setValues,
  } = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    if (user) {
      setValues(
        { ...values, name: user.displayName, email: user.email },
        false
      );
    }
    // eslint-disable-next-line
  }, [user, setValues]);

  return (
    <div className="my-12">
      <h2 className="my-6 text-2xl">Shipping address</h2>
      <AddressList values={values} setValues={setValues} />
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2 my-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="app-input lg:col-span-2">
            <Input
              title="YOUR NAME"
              name="name"
              placeholder="John Doe"
              textError={touched.name ? errors.name : undefined}
              id="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              my2={false}
              required
            />
          </div>
          <div className="app-input">
            <Input
              title="EMAIL"
              name="email"
              placeholder="johndoe@example.com"
              textError={touched.email ? errors.email : undefined}
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              my2={false}
              required
            />
          </div>
          <div className="app-input md:col-span-2 lg:col-span-1">
            <Select
              title="COUNTRY"
              name="country"
              textError={touched.country ? errors.country : undefined}
              id="country"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.country}
              required
            >
              {country}
            </Select>
          </div>
          <div className="app-input">
            <Select
              title="STATE"
              name="state"
              textError={touched.state ? errors.state : undefined}
              id="state"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.state}
              required
            >
              {state}
            </Select>
          </div>
          <div className="app-input">
            <Input
              title="CITY"
              name="city"
              placeholder="New York"
              textError={touched.city ? errors.city : undefined}
              id="city"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              my2={false}
              required
            />
          </div>
          <div className="app-input md:col-span-2 lg:col-span-3">
            <TextArea
              title="STREET ADDRESS"
              name="address"
              textError={touched.address ? errors.address : undefined}
              id="address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              required
            />
          </div>
          <SignUp
            {...{
              values,
              handleChange,
              handleBlur,
              touched: (touched as unknown) as IInitialValues,
              errors: (errors as unknown) as IInitialValues,
              setValues,
            }}
          />
        </div>

        <section className="my-12">
          <h2 className="my-6 text-2xl">Payment method</h2>{' '}
          <div className="w-full my-2">
            <label>
              <input
                name="paymentMethod"
                type="radio"
                value="CASH"
                onChange={(e) =>
                  setValues({ ...values, paymentMethod: e.target.value }, true)
                }
              />{' '}
              <span className="ml-2">Cash on Delivery</span>
            </label>{' '}
            <div className="mt-3 text-xs italic text-red-600"></div>
          </div>
        </section>

        {children}

        <section className="flex flex-col justify-between md:flex-row-reverse">
          <Button
            type="primary"
            htmlType="submit"
            disabled={Object.keys(errors).length > 0}
            boold
          >
            Order pizza!
          </Button>
        </section>
      </form>
    </div>
  );
};

export default Form;
