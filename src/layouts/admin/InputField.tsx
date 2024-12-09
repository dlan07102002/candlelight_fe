import { FiEye, FiEyeOff } from "react-icons/fi";

const InputField: React.FC<{
    icon: any;
    label: string;
    name: string;
    type?: string | undefined;
    value: any;
    readOnly?: boolean | undefined;
    error?: any;
    setState: React.Dispatch<React.SetStateAction<any>>;
    isPassword?: boolean | undefined;
    showPassword?: boolean | undefined;
    setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    icon: Icon,
    label,
    name,
    type = "text",
    value,
    readOnly = false,
    error,
    setState,
    isPassword,
    showPassword,
    setShowPassword,
}) => {
    return (
        <div className="mb-3 ">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group ">
                <span className="input-group-text ">
                    <Icon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                    type={showPassword ? type : "text"}
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => setState && setState(e.target.value)}
                    readOnly={readOnly}
                    className={`form-control pe-5 ${
                        error ? "is-invalid" : ""
                    } ${readOnly ? "bg-light" : ""}`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword && setShowPassword(!showPassword)
                        }
                        className="position-absolute  end-0 pe-3 border-0 bg-transparent "
                        style={{ top: "25%" }}
                    >
                        {showPassword ? (
                            <FiEyeOff className="text-muted" />
                        ) : (
                            <FiEye className="text-muted" />
                        )}
                    </button>
                )}
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default InputField;
