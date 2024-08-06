import SidebarItemLink from "../Sidebar/SidebarItemLink";
import SidebarItemsLinkContainer from "../Sidebar/SidebarItemsLinkContainer";
import { SidebarLinkIconSize } from "@/lib/measurementUnits";

import { IconBuildingEstate, IconFileInvoice, IconPackages, IconSettings, IconTools, IconUserCircle, IconUserStar, IconUsersGroup, IconHome } from "@tabler/icons-react";

export default function Sidebar() {
  return (
    <div className="fixed left-0 max-w-[240px] w-full h-[calc(100vh-5rem)] border-r border-r-gray-300 px-4 py-6">
      <div className="flex flex-col justify-between gap-2 h-full">
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold uppercase pl-2">Managment</h3>

          <div>
            <SidebarItemsLinkContainer>
              <SidebarItemLink href="">
                <IconHome />
                Home
              </SidebarItemLink>
            </SidebarItemsLinkContainer>
          </div>
          <div>
            <SidebarItemsLinkContainer>
              <SidebarItemLink href='#'>
                <IconTools size={SidebarLinkIconSize} />
                Employees
              </SidebarItemLink>
              <SidebarItemLink href="">
                <IconUserStar size={SidebarLinkIconSize} />
                Clients
              </SidebarItemLink>
              <SidebarItemLink href="">
                <IconUsersGroup size={SidebarLinkIconSize} />
                Providers
              </SidebarItemLink>
            </SidebarItemsLinkContainer>
          </div>
          <div>
            <SidebarItemsLinkContainer>
              <SidebarItemLink href="">
                <IconPackages size={SidebarLinkIconSize} />
                Inventory
              </SidebarItemLink>
              <SidebarItemLink href="">
                <IconFileInvoice />
                Invoices
              </SidebarItemLink>
              <SidebarItemLink href="">
                <IconBuildingEstate />
                Properties
              </SidebarItemLink>
            </SidebarItemsLinkContainer>
          </div>
        </div>
        <div>
          <SidebarItemsLinkContainer>
            <SidebarItemLink href="">
              <IconUserCircle />
              Profile
            </SidebarItemLink>
            <SidebarItemLink href="">
              <IconSettings />
              Settings
            </SidebarItemLink>
          </SidebarItemsLinkContainer>
        </div>
      </div>
    </div>
  )
}