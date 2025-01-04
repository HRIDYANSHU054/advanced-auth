import { Check, X } from "lucide-react";

function PasswordCriteria({ password }) {
  const criterias = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criterias.map((criteria, ind) => (
        <div key={`criteria-${ind + 1}`} className="flex items-center text-xs">
          {criteria.met ? (
            <Check className="mr-2 size-4 text-green-500" />
          ) : (
            <X className="mr-2 size-4 text-gray-500" />
          )}

          <span
            className={`${criteria.met ? "text-green-500" : "text-gray-500"}`}
          >
            {criteria.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// helper functions below
function assessStrength(pass) {
  let strength = 0;
  if (pass.length >= 6) strength++;
  if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
  if (pass.match(/\d/)) strength++;
  if (pass.match(/[^a-zA-Z\d]/)) strength++;
  return strength;
}

function getStrengthText(strength) {
  if (strength < 1) return "Very Weak";
  if (strength < 2) return "Weak";
  if (strength < 3) return "Fair";
  if (strength < 4) return "Good";
  return "Strong";
}

function getStrengthColor(strength) {
  if (strength < 1) return "bg-red-500";
  if (strength < 2) return "bg-red-400";
  if (strength < 3) return "bg-yellow-500";
  if (strength < 4) return "bg-yellow-400";
  return "bg-green-500";
}
//helper functions above this line

function PasswordStrengthMeter({ password }) {
  const strength = assessStrength(password);

  return (
    <div className="mt-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-gray-400">Password Strength</span>
        <span className="text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getStrengthColor(strength) : "bg-gray-600"} `}
          ></div>
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
}

export default PasswordStrengthMeter;
