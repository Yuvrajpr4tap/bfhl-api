import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "john_doe"; 
const DOB = "17091999"; 
const EMAIL = "john@example.com";
const ROLL_NUMBER = "AB123";

function alternatingCapsReverse(arr) {
  let result = "";
  let toggle = true;
  for (let i = arr.length - 1; i >= 0; i--) {
    result += toggle ? arr[i].toUpperCase() : arr[i].toLowerCase();
    toggle = !toggle;
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.data;

    if (!Array.isArray(inputArray)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let even = [];
    let odd = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    inputArray.forEach(item => {
      if (!isNaN(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) even.push(item);
        else odd.push(item);
        sum += num;
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      even_numbers: even,
      odd_numbers: odd,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum,
      concatenated_alphabets: alternatingCapsReverse(alphabets)
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; // Required for Vercel
