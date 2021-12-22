import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-color: red;
  margin-top: 20%;
`;

const useLoading = () => {
  return <HashLoader color="#20312d" css={override} size={100} />;
};

export default useLoading;
