import SearchDemo from "./custom-search";

import { ProfileForm } from "./custom-dialog";
import FindSpaceDialog from "../findspacedialog/findspacedialog";

interface HeaderProps {}

export default function Header() {
  return (
    <div className="sticky top-0 h-[60px] ">
      <div className="flex items-center h-full justify-end px-4 gap-x-5 ">
        <div className="flex gap-2 ">
          <div className="flex">
            <SearchDemo />
          </div>
          <ProfileForm />
          <FindSpaceDialog />
        </div>
      </div>
    </div>
  );
}
