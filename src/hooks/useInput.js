import { useMemo, useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useMemo(
    () => (event) => setValue(event.target.value),
    []
  );

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;

