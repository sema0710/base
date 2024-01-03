import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ChangeEvent, KeyboardEvent, useMemo, useState } from "react";
import axios from "axios";
import { validateRallitUrl } from "../utils/validate";
import OpenAI from "openai";
import { useRouter } from "next/router";

export default function Home() {
  const route = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveToLocal = (openAIData: OpenAI.Chat.Completions.ChatCompletion) => {
    const contents = openAIData.choices[0].message.content?.split("\n");
    window.localStorage.setItem("questions", JSON.stringify(contents));
  };

  const handleSubmit = async () => {
    const validateResult = validateRallitUrl(url);

    if (validateResult) {
      setError(validateResult);
      return;
    }

    setIsLoading(true);

    try {
      const result = await axios.post("/api/upload-resume/rallit", { url });
      saveToLocal(result.data);

      route.push("/result");
    } catch (error) {
      window.alert(
        "문제가 발생했습니다. 개발자에게 문의해주세요. -> pandati0710@gmail.com"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handleChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    await axios.post("/api/upload-resume/file", formData);
    setIsLoading(false);
  };

  const helperMessage = useMemo(() => {
    if (error) {
      return error;
    }

    if (isLoading) {
      return "생성에 30초에서 1분정도의 시간이 소요됩니다...";
    }

    return "";
  }, [error, isLoading]);

  return (
    <Box
      component="main"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      padding="16px"
      height="100vh"
    >
      <Box
        component="section"
        maxWidth="768px"
        width="100%"
        padding="32px"
        margin="auto"
      >
        <TextField
          variant="outlined"
          label="rallit resume url"
          style={{ paddingBottom: "16px" }}
          fullWidth
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          error={!!error}
          helperText={helperMessage}
          aria-errormessage={error}
        />
        <LoadingButton
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          loading={isLoading}
        >
          submit
        </LoadingButton>
        <label>
          <Box display="none">
            {/* <input
              type="file"
              accept="application/pdf"
              onChange={handleChangeFileInput}
            /> */}
          </Box>
          <Typography
            marginTop="4px"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => window.alert("준비중입니다 ㅠㅠ")}
          >
            or upload pdf file
          </Typography>
        </label>
      </Box>
    </Box>
  );
}
