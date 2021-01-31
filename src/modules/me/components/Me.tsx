import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Me() {
  const { data } = useSelector((state: any) => state.user);
  return (
    <div style={{ textAlign: "center" }}>
      <h2>{data.id}</h2>
      <h2>
        {data.title} {data.firstName} {data.lastName}
      </h2>
      <h2>{data.gender === "m" ? "เพศชาย" : "เพศหญิง"}</h2>
      <h2>{data.email}</h2>
      <h2>{data.createDate}</h2>
    </div>
  );
}
