import { useCallback, useState } from "react";

const useSwitch = (initialState) => {
  const [isSwitchOn, setIsSwitchOn] = useState(initialState);

  const toggleSwitch = useCallback(
    () => setIsSwitchOn((current) => !current),
    [setIsSwitchOn]
  );

  return [isSwitchOn, toggleSwitch];
};

export { useSwitch };
