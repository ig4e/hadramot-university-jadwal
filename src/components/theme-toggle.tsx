import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { Menu, Button, Text, rem } from "@mantine/core";

import React from "react";

function ThemeToggle() {
  const { setColorScheme, clearColorScheme, colorScheme } =
    useMantineColorScheme();
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <Tooltip label="الوان البرنامج">
          <ActionIcon variant="filled" size={"lg"} aria-label="الوان البرنامج">
            {colorScheme === "auto" && <IconDeviceDesktop></IconDeviceDesktop>}
            {colorScheme === "light" && <IconSun></IconSun>}
            {colorScheme === "dark" && <IconMoon></IconMoon>}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>الوان البرنامج</Menu.Label>
        <Menu.Item
          onClick={() => setColorScheme("light")}
          leftSection={<IconSun style={{ width: rem(14), height: rem(14) }} />}
        >
          فاتح
        </Menu.Item>
        <Menu.Item
          onClick={() => setColorScheme("dark")}
          leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
        >
          داكن
        </Menu.Item>
        <Menu.Item
          onClick={() => setColorScheme("auto")}
          leftSection={
            <IconDeviceDesktop style={{ width: rem(14), height: rem(14) }} />
          }
        >
          مثل النظام
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ThemeToggle;
