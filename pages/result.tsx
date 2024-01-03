import { FaPencil, FaFloppyDisk } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";

import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { cloneDeep, isNil } from "lodash";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const stringifyQuestions = window.localStorage.getItem("questions");

    if (isNil(stringifyQuestions)) {
      route.replace("/upload-resume");
      return;
    }

    const questions = JSON.parse(stringifyQuestions) as string[];
    setQuestions(questions);
  }, [route]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCopy = () => {
    const text = questions.join("\n");

    copyToClipboard(text);
  };

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
        <Box display="flex" justifyContent="space-between">
          <Box>
            {editMode ? (
              <Button
                onClick={() => setEditMode(false)}
                startIcon={<FaFloppyDisk size={14} />}
              >
                save
              </Button>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                startIcon={<FaPencil size={14} />}
              >
                edit
              </Button>
            )}
          </Box>
          <Button
            startIcon={<VscDebugRestart size={14} />}
            onClick={() => route.push("/upload-resume")}
          >
            retry
          </Button>
        </Box>
        <List style={{ marginBottom: "16px" }}>
          {questions.map((question, index) => {
            const [_, value] = question.split(/[1-9|10]\. /);
            return (
              <ListItem key={index}>
                {editMode ? (
                  <>
                    <Typography width="30px">{index + 1}.</Typography>
                    <TextField
                      value={value}
                      fullWidth
                      size="small"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setQuestions((prevQuestions) => {
                          const nextQuestions = cloneDeep(prevQuestions);
                          nextQuestions[index] = `${index + 1}. ${
                            e.target.value
                          }`;

                          return nextQuestions;
                        })
                      }
                    />
                  </>
                ) : (
                  <Box minHeight="40px" display="flex" alignItems="center">
                    <Typography>{question}</Typography>
                  </Box>
                )}
              </ListItem>
            );
          })}
        </List>
        <Box>
          <Button
            variant="contained"
            style={{ marginRight: "8px" }}
            onClick={handleCopy}
          >
            copy
          </Button>
          <Button href="https://forms.gle/UfVucyc486Hyu8PF7" target="_blank">
            Feedback
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
