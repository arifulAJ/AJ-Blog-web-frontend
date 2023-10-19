import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <div className="  w-56 h-96 border rounded-2xl p-4 m-5  ">
      <Image
        src={
          "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg"
        }
        height={50}
        width={50}
        alt="profile"
      />
      <h1>this the profile com sdkjflksdjf</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim dolorem,
        fuga ipsum delectus perspiciatis ratione repellat ipsam neque nobis
        incidunt deserunt nihil saepe quo blanditiis quae labore. Rem, saepe
        tempore.
      </p>
    </div>
  );
};

export default Profile;
