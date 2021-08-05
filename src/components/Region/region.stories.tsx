import React from "react";
import Region from './index';

export default {
  title: "@Components/Region",
  component: Region,
  parameters: {}
};
const res = {
  regions: []
}
export const DefaultRegion = () => {
  return (
    <div style={{width: 370}}>
      <Region
        request={() => new Promise((resolve => resolve(res)))}
        initData={{}}
        onChange={() => {}}
      />
    </div>
  )
};
