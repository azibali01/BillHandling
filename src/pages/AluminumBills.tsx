import { useState } from 'react';
import { TextInput } from "@mantine/core";

const AluminumBills = () => {
     const [value, setValue] = useState('');
return(  <TextInput
      value={value}
      placeholder='Search aluminum bills'
      onChange={(event) => setValue(event.currentTarget.value)}
      m={"md"}
    /> );
}
export default AluminumBills;