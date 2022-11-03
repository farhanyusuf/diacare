import {
  Flex,
  Box,
  Text,
  Grid,
  GridItem,
  Input,
  Button,
  Select,
  Stack,
  VStack,
  Image,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PhoneIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Status = {
  CLINICAL_SYMPTOMS: "clinical symptoms",
  CLINICAL_SYMPTOMS_POS: "clinical symptoms +",
  CLINICAL_SYMPTOMS_NEG: "clinical symptoms -",
  GDP_GDS: "GDP&GDS",
  GDP_GDS_RETEST: "GDP&GDS RETEST",
  TTGO: "TTGO",
  POSITIVE: "Positif Diabetes Mellitus",
  NORMAL: "Normal",
  TGT: "TGT",
  GDPT: "GDPT",
};
export default function Home() {
  // logic
  const [start, setStart] = useState(false);
  const [status, setStatus] = useState(Status.CLINICAL_SYMPTOMS);
  const [input, setInput] = useState();
  const [question, setQuestion] = useState(
    "Berapakah jumlah gejala yang anda alami dari gejala berikut ini: 1. Sering lapar, 2. Sering haus, 3. Sering pipis, 4. Penurunan berat badan yang tidak diketahui penyebabnya"
  );
  const [isFound, setIsFound] = useState(false);

  var initOption = ["Kurang dari 3", "Lebih dari 3"];

  const [option, setOption] = useState(initOption);

  const handleChange = (e: any) => setInput(e.target.value);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("handlesubmit");
    console.log(event);
    console.log(input);
    if (status == Status.CLINICAL_SYMPTOMS) {
      if (input == 1) {
        setStatus(Status.CLINICAL_SYMPTOMS_POS);
        setOption(["GDP >= 126 atau GDS >= 200", "GDP < 126 atau GDS < 200"]);
      } else {
        setStatus(Status.CLINICAL_SYMPTOMS_NEG);
        setOption([
          "GDP >= 126 atau GDS >= 200",
          "100 <= GDP <= 125 atau 140 < GDS < 199",
          "GDP < 100 atau GDS < 140",
        ]);
      }
      setQuestion("GDP & GDS?");
    } else if (status == Status.CLINICAL_SYMPTOMS_POS) {
      if (input == 0) {
        setStatus(Status.POSITIVE);
        setIsFound(true);
      } else if (input == 1) {
        setStatus(Status.GDP_GDS_RETEST);
        setQuestion("Hasil dari pengecekan ulang GDP & GDS?");
        setOption(["GDP >= 126 atau GDS >= 200", "GDP < 126 atau GDS < 200"]);
      }
    } else if (status == Status.CLINICAL_SYMPTOMS_NEG) {
      if (input == 0) {
        setStatus(Status.GDP_GDS_RETEST);
        setQuestion("Hasil dari pengecekan ulang GDP & GDS?");
        setOption(["GDP >= 126 atau GDS >= 200", "GDP < 126 atau GDS < 200"]);
      } else if (input == 1) {
        setStatus(Status.TTGO);
        setQuestion("TTGO Glukosa darah 2 jam?");
        setOption([">=200", "140-199", "<140"]);
      } else if (input == 2) {
        setStatus(Status.NORMAL);
        setIsFound(true);
      }
    } else if (status == Status.GDP_GDS_RETEST) {
      if (input == 0) {
        setStatus(Status.POSITIVE);
        setIsFound(true);
      } else if (input == 1) {
        setStatus(Status.TTGO);
        setQuestion("TTGO Glukosa darah 2 jam?");
        setOption([">=200", "140-199", "<140"]);
      }
    } else if (status == Status.TTGO) {
      if (input == 0) {
        setStatus(Status.POSITIVE);
      } else if (input == 1) {
        setStatus(Status.TGT);
      } else {
        setStatus(Status.GDPT);
      }
      setIsFound(true);
    }
  };

  return (
    <Flex direction={"column"} minH="100vh" minW="120vh" h="100%">
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        alignItems="center"
        bg="black"
        h="48px"
        w="full"
        boxShadow="inset 0px -1px 0px #E9E9E9"
        px="100px"
      >
        <GridItem>
          <HStack>
            <Text
              fontFamily={"Inter"}
              fontSize="lg"
              fontWeight="regular"
              color={"white"}
              textAlign="left"
            >
              Diacare
            </Text>
            <Image
              src="/assets/logo.png"
              alt="Diacare"
              boxSize="36px"
              borderRadius="36px"
            />
          </HStack>
        </GridItem>
        <GridItem justifySelf={"end"}>
          <HStack>
            <PhoneIcon color={"white"} />
            <Text
              fontFamily={"Inter"}
              fontSize="lg"
              fontWeight="regular"
              color={"white"}
              textAlign="left"
            >
              Contact Us
            </Text>
            <Menu id="account" isLazy direction="ltr" autoSelect={false}>
              <MenuButton
                as={ChevronDownIcon}
                color="white"
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                _hover={{
                  background: "#747474",
                  borderRadius: "4px",
                  color: "white",
                }}
              ></MenuButton>
              <MenuList minW="230px" px={2}>
                <MenuItem
                  mt={2}
                  fontSize="sm"
                  bg="white"
                  borderRadius="4px"
                  borderColor={"white"}
                >
                  13519129@std.stei.itb.ac.id
                </MenuItem>
                <MenuItem
                  mt={2}
                  fontSize="sm"
                  bg="white"
                  borderRadius="4px"
                  borderColor={"white"}
                >
                  13519179@std.stei.itb.ac.id
                </MenuItem>
                <MenuItem
                  mt={2}
                  fontSize="sm"
                  bg="white"
                  borderRadius="4px"
                  borderColor={"white"}
                >
                  13519202@std.stei.itb.ac.id
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </GridItem>
      </Grid>
      <Flex
        px={"100px"}
        py={"4rem"}
        justifyContent={"center"}
        direction="column"
        gap={"auto"}
        bg="linear-gradient(0deg, rgba(27,93,80,1) 0%, rgba(132,172,164,1) 0%, rgba(235,249,246,1) 68%, rgba(255,255,255,1) 80%)"
        h="100%"
      >
        <Box
          boxShadow="outline"
          rounded="8px"
          bg="white"
          flexGrow={1}
          height="100vh"
        >
          <HStack justifyContent={"center"} bg="747474">
            <Image
              src="/assets/logo.png"
              alt="Diacare"
              boxSize="48px"
              borderRadius="4px"
            />
            <Text
              fontSize="4vw"
              ml="auto"
              mr="auto"
              fontWeight={"semibold"}
              fontFamily="Inter"
            >
              Diacare
            </Text>
          </HStack>
          <Text
            fontSize="1vw"
            ml="auto"
            mr="auto"
            fontWeight={"thin"}
            fontFamily="Inter"
            textAlign={"center"}
            color="#747474"
          >
            Knowledge Based System (KBS) untuk mendeteksi penyakit{" "}
            <i>Diabetes Mellitus</i>
          </Text>
          <Divider h={20} />
          {start === false ? (
            <Box textAlign={"center"} bg="#f3f3f3" p={"10px"}>
              <Button
                rightIcon={<ChevronRightIcon />}
                color="white"
                bg="#1c5c54"
                fontSize="1vw"
                fontFamily={"Inter"}
                borderWidth={0}
                borderRadius={4}
                p={10}
                px={"36px"}
                _hover={{
                  bgColor: "#84aca4",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setStart(true);
                }}
              >
                Mulai Deteksi
              </Button>
            </Box>
          ) : (
            <Box bg="#f3f3f3" h="90%">
              <Flex
                mx="auto"
                width="80%"
                height="auto"
                p="10px"
                direction={"column"}
              >
                <Box mt="20px" borderRadius={"10px"} bg="white" p="16px">
                  {!isFound ? (
                    <form onSubmit={handleSubmit}>
                      <label>
                        <Text fontFamily={"Inter"} textAlign={"center"}>
                          {question}
                        </Text>
                        <Divider />
                        <Box textAlign={"center"}>
                          <Select
                            onChange={handleChange}
                            size="lg"
                            borderColor={"white"}
                            borderRadius="2px"
                            shadow="1px 1px 1px 1px #747474"
                            fontFamily={"Inter"}
                            css={{
                              "-webkit-appearance": "none",
                              "-moz-appearance": "none",
                              "padding-left": "10px",
                            }}
                          >
                            {option.map((opt, idx) => {
                              return (
                                <option key={idx} value={idx}>
                                  {opt}
                                </option>
                              );
                            })}
                          </Select>
                        </Box>
                      </label>
                      <Divider />

                      <Box textAlign={"center"}>
                        <Input
                          type="submit"
                          value="Submit"
                          color="white"
                          bg="#1c5c54"
                          fontSize="1vw"
                          fontFamily={"Inter"}
                          borderWidth={0}
                          borderRadius={4}
                          p={10}
                          px={"36px"}
                          _hover={{
                            bgColor: "#84aca4",
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                    </form>
                  ) : (
                    <Box textAlign={"center"} bg="#f3f3f3" p={"10px"}>
                      <Button
                        rightIcon={<ChevronRightIcon />}
                        color="white"
                        bg="#1c5c54"
                        fontSize="1vw"
                        fontFamily={"Inter"}
                        borderWidth={0}
                        borderRadius={4}
                        p={10}
                        px={"36px"}
                        _hover={{
                          bgColor: "#84aca4",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        Mulai Ulang
                      </Button>
                    </Box>
                  )}
                  <Divider h={"24px"} />
                  <Flex justifyContent={"center"} gap={8}>
                    <Text
                      color="#747474"
                      mt={1}
                      fontSize="0.8vw"
                      fontFamily={"Inter"}
                      mx={2}
                    >
                      -GDP: Glukosa Darah Puasa
                    </Text>

                    <Text
                      color="#747474"
                      mt={1}
                      fontSize="0.8vw"
                      fontFamily={"Inter"}
                      mx={2}
                    >
                      -GDS: Glukosa Darah Sewaktu
                    </Text>

                    <Text
                      color="#747474"
                      mt={1}
                      fontSize="0.8vw"
                      fontFamily={"Inter"}
                      mx={2}
                    >
                      {" "}
                      -GDPT: Glukosa Darah Puasa Terganggu
                    </Text>

                    <Text
                      color="#747474"
                      mt={1}
                      fontSize="0.8vw"
                      fontFamily={"Inter"}
                      mx={2}
                    >
                      -TGT: Toleransi Glukosa Terganggu
                    </Text>
                  </Flex>
                </Box>

                {isFound && (
                  <Flex
                    mt="20px"
                    borderRadius={"10px"}
                    bg="white"
                    p="16px"
                    direction={"row"}
                    justifyContent="center"
                    fontFamily={"Inter"}
                  >
                    <Text fontSize="2vw" fontWeight={800} mr={8}>
                      Hasil Diagnosis :
                    </Text>
                    <Text fontSize="2vw" fontWeight={800}>
                      {status}
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
