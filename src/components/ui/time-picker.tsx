import { ActionIcon, rem } from "@mantine/core";
import { TimeInput as MeTimeInput, TimeInputProps } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

import React, { useRef } from "react";

const TimeInput = (props: TimeInputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return <MeTimeInput {...props} ref={ref} rightSection={pickerControl} />;
};

TimeInput.displayName = "TimeInput";

export { TimeInput };
