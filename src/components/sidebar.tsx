import {
  AppShell,
  ScrollArea,
  ScrollAreaAutosize,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardRoutes } from "~/config/dashboard";
import { cn } from "~/lib/utils";
import { NavItemWithChildren } from "~/types/nav";

function Sidebar({ close }: { close: () => void }) {
  const pathname = usePathname();

  return (
    <AppShell.Navbar
      className="flex flex-col justify-between bg-slate-900 text-white dark:bg-slate-950"
      withBorder={false}
    >
      <ScrollArea
        type="auto"
        classNames={{
          thumb: "scroll-area-thumb",
        }}
      >
        <div>
          {dashboardRoutes.map((route) => {
            const isActive =
              route.href === pathname ||
              route.items.some(
                (r) =>
                  (pathname.includes(r.href!) && r.href !== "/") ||
                  r.href === pathname,
              );

            return (
              <Stack
                key={route.title}
                gap={"sm"}
                className={cn("px-4 py-4 transition", {})}
              >
                <Title order={5}>{route.title}</Title>
                <Stack gap={"xs"}>
                  {route.items.map((routeItem) => {
                    const isActive = pathname === routeItem.href;

                    return (
                      <div
                        key={routeItem.title}
                        className="flex flex-col gap-2"
                      >
                        <NavLink
                          close={close}
                          route={routeItem}
                          isActive={isActive}
                        ></NavLink>
                        {routeItem.items.length > 0 && (
                          <div className="px-2 pb-2">
                            {routeItem.items?.map((subRouteItem) => {
                              const isActive = pathname.includes(
                                subRouteItem.href!,
                              );

                              return (
                                <NavLink
                                  close={close}
                                  variant="sub"
                                  key={subRouteItem.title}
                                  route={subRouteItem}
                                  isActive={isActive}
                                ></NavLink>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Stack>
              </Stack>
            );
          })}
        </div>
      </ScrollArea>
      <div className="p-4">
        <div className="rounded-lg border border-neutral-600 p-2 dark:ring-neutral-700">
          <p>صنع ب ❤️ من محمد ابوبكر احمد باوزير @ayak</p>
        </div>
      </div>
    </AppShell.Navbar>
  );
}

function NavLink({
  route,
  isActive,
  variant = "default",
  close,
}: {
  route: NavItemWithChildren;
  isActive: boolean;
  variant?: "default" | "sub";
  close: () => void;
}) {
  if (route.sub) variant = "sub";

  return (
    <UnstyledButton
      href={route.href!}
      component={Link}
      onClick={close}
      className={cn(
        "group flex !cursor-pointer !select-none items-center gap-2 ring-1 transition",
        {
          "rounded-xl bg-slate-600/10 p-2": variant === "default",
          "rounded-lg bg-slate-600/25 px-2 py-[7px] ring-0": variant === "sub",
        },
        {
          "ring-neutral-600 hover:bg-blue-700 hover:text-white hover:ring-neutral-500 dark:ring-neutral-700":
            "hover",
          "bg-blue-600 text-white": isActive,
        },
      )}
    >
      <div
        className={cn(
          "w-fit rounded-lg bg-blue-600  text-white transition",
          {
            "p-1.5": variant === "default",
            "p-[5px]": variant === "sub",
          },
          {
            "group-hover:bg-white group-hover:text-neutral-900": "hover",
            "bg-white text-neutral-900": isActive,
          },
        )}
      >
        <route.icon
          className={cn({
            "h-5 w-5": variant === "default",
            "h-4 w-4": variant === "sub",
          })}
        />
      </div>
      <Text
        size={variant === "default" ? "lg" : "sm"}
        className="!cursor-pointer !select-none"
      >
        {route.title}
      </Text>
    </UnstyledButton>
  );
}

export default Sidebar;
