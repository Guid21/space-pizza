import firebase from 'firebase';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import _ from 'lodash';

import { IHistory } from '../../../../../../../History/components/List/List';
import { IInitialValues } from '../../Form';

interface IAddressList {
  values: IInitialValues;
  setValues: (
    values: React.SetStateAction<IInitialValues>,
    shouldValidate?: boolean | undefined
  ) => any;
}

const AddressList = ({ values, setValues }: IAddressList) => {
  const [addres, setAddres] = useState('newAddress');
  const [addressList, setAddressList] = useState<any[]>([]);
  const [user] = useAuthState(firebase.auth());

  const getData = useCallback(async () => {
    const { docs } = await firebase.firestore().collection(user.uid).get();
    const history = docs.map((doc) => doc.data()) as IHistory[];

    setAddressList(
      _.uniqWith(
        history.map(({ country, state, city, address }) => ({
          country,
          state,
          city,
          address,
        })),
        _.isEqual
      )
    );
  }, [user]);

  const handlerAdress = ({
    e,
    country,
    state,
    city,
    address,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    country: string;
    state: string;
    city: string;
    address: string;
  }) => {
    setAddres(e.target.value);
    setValues({ ...values, country, state, city, address }, true);
  };

  useEffect(() => {
    const { country, state, city, address } = values;
    if (addres !== `${country} ${state} ${city} ${address}`)
      setAddres('newAddress');
  }, [values, addres]);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user, getData]);

  if (!user) return null;

  return (
    <div className="space-y-2">
      {addressList.map(({ country, state, city, address }, index) => (
        <div className="w-full" key={index}>
          <label>
            <input
              type="radio"
              value={`${country} ${state} ${city} ${address}`}
              onChange={(e) =>
                handlerAdress({ e, country, state, city, address })
              }
              checked={addres === `${country} ${state} ${city} ${address}`}
            />{' '}
            <span className="ml-2">{`${country} ${state} ${city} ${address}`}</span>
          </label>
        </div>
      ))}
      <div className="w-full">
        <label>
          <input
            type="radio"
            value={addres}
            onChange={(e) => setAddres(e.target.value)}
            checked={addres === 'newAddress'}
          />{' '}
          <span className="ml-2">New Address</span>
        </label>
      </div>
    </div>
  );
};

export default AddressList;
