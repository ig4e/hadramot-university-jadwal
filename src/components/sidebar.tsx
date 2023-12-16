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

function Sidebar() {
  const pathname = usePathname();

  return (
    <AppShell.Navbar className="flex flex-col justify-between bg-slate-900 pt-4 text-white">
      <ScrollArea>
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
                className={cn("px-4 py-4 transition", {
                  "rounded-lg bg-slate-700/25": isActive,
                })}
              >
                <Title order={5}>{route.title}</Title>
                <Stack gap={"xs"}>
                  {route.items.map((routeItem) => {
                    const isActive = pathname === routeItem.href;

                    return (
                      <div
                        key={routeItem.title}
                        className="flex flex-col gap-2 rounded-md ring-1 ring-neutral-600"
                      >
                        <NavLink
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
        <div className="rounded-md border border-neutral-600 p-2">
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
}: {
  route: NavItemWithChildren;
  isActive: boolean;
  variant?: "default" | "sub";
}) {
  if (route.sub) variant = "sub";

  return (
    <UnstyledButton
      href={route.href!}
      component={Link}
      className={cn(
        "group flex !cursor-pointer !select-none items-center gap-2 ring-1 transition",
        {
          "rounded-md bg-slate-600/10 p-2": variant === "default",
          "rounded bg-slate-600/25 px-2 py-1.5 ring-0": variant === "sub",
        },
        {
          "ring-neutral-600 hover:bg-blue-700 hover:text-white": "hover",
          "bg-blue-600 text-white": isActive,
        },
      )}
    >
      <div
        className={cn(
          "w-fit rounded-md bg-blue-600  text-white transition",
          {
            "p-1.5": variant === "default",
            "p-1": variant === "sub",
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
