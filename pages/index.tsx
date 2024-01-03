import { Box, Button, Typography } from "@mui/material";
import { FaCircleArrowRight } from "react-icons/fa6";

const Main = () => {
  return (
    <Box
      component="main"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography
        component="h1"
        fontSize={48}
        fontWeight="bold"
        textAlign="center"
        marginBottom="16px"
      >
        BASE
      </Typography>
      <Typography fontSize={18}>
        BASE로 이력서를 기반으로 면접을 준비해보세요.
      </Typography>
      <Typography marginBottom="16px">
        추후 많은 기능이 업데이트 예정입니다.
      </Typography>

      <Button
        variant="contained"
        endIcon={<FaCircleArrowRight size={14} />}
        href="/upload-resume"
      >
        Go to create questions
      </Button>
    </Box>
  );
};

export default Main;
