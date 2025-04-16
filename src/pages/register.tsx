// src/pages/Register.tsx
import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";

const db = getFirestore();

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const US_STATES = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
  ];

  const handleSubmit = async () => {
    setError(null);

    const newErrors: { [key: string]: string } = {};

    if (!fullName) newErrors.fullName = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    if (!street) newErrors.street = "Street address is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!zip) newErrors.zip = "ZIP code is required";

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCred.user.uid;

      // Create a user profile in Firestore
      await setDoc(doc(db, "users", uid), {
        fullName,
        email,
        company: company || null,
        address: {
          street,
          street2: street2 || null,
          city,
          state,
          zip,
        },
        createdAt: serverTimestamp(),
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Create Account</h2>

      <Input
        label="Full Name*"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className={fieldErrors.fullName ? "border-red-500" : ""}
        error={fieldErrors.fullName}
      />
      <Input
        label="Email*"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={fieldErrors.email ? "border-red-500" : ""}
        error={fieldErrors.email}
      />
      <Input
        label="Company"
        type="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <Input
        label="Street*"
        type="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        className={fieldErrors.street ? "border-red-500" : ""}
        error={fieldErrors.street}
      />
      <Input
        label="Street 2"
        type="Street 2"
        value={street2}
        onChange={(e) => setStreet2(e.target.value)}
      />
      <Input
        label="City*"
        type="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={fieldErrors.city ? "border-red-500" : ""}
        error={fieldErrors.city}
      />
      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-600">State *</label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${
            fieldErrors.state ? "border-red-500" : ""
          }`}
          required
        >
          <option value="">Select a state</option>
          {US_STATES.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {fieldErrors.state && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.state}</p>
        )}
      </div>

      <Input
        label="Zip*"
        type="Zip"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        className={fieldErrors.zip ? "border-red-500" : ""}
        error={fieldErrors.zip}
      />
      <Input
        label="Password*"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={fieldErrors.password ? "border-red-500" : ""}
        error={fieldErrors.password}
      />
      <Input
        label="Confirm Password*"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={fieldErrors.confirmPassword ? "border-red-500" : ""}
        error={fieldErrors.confirmPassword}
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {loading ? "Creating account..." : "Register"}
      </button>
    </div>
  );
}
