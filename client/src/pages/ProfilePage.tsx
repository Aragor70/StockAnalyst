import { Suspense } from "react";

import ProfilePresentation from "../components/profile/Presentation";

const ProfilePage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <ProfilePresentation />
    </Suspense>
  );
};

export default ProfilePage;