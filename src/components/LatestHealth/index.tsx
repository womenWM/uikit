import { FC } from 'react';
import Info, { InfoProps } from './Info';

export type ILatesHealthComponent = {
  Info: FC<InfoProps>,
}
const LatestHealth: ILatesHealthComponent = {
  Info,
};

export default LatestHealth;
