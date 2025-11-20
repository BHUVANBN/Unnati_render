import { redis } from "@/lib/db";
import mailService from "./email";
import { logger } from "../lib/logger";

// For testing, use global storage to persist across module reloads
declare global {
    var otpStorage: Map<string, { otp: string; expiry: number }> | undefined;
}

class OTPservice {
    private storage: Map<string, { otp: string; expiry: number }>;

    constructor() {
        if (!global.otpStorage) {
            global.otpStorage = new Map();
        }
        this.storage = global.otpStorage;
    }

    generateCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async sendOtp(email: string) {
        try {
            const otp = this.generateCode();

            // For testing, store in global memory without expiry
            this.storage.set(email, { otp, expiry: Infinity });

            logger.debug("[OTP_SERVICE] OTP stored in memory", {
                email: email,
                expirySeconds: 180,
            });

            // For testing, log OTP instead of sending email
            console.log(`[OTP] For ${email}: ${otp}`);

            // await mailService.sendEmail(
            //     email,
            //     "OTP Verification",
            //     `Your OTP is ${otp}`,
            // );
            return {
                status: true,
                message: "OTP sent successfully",
                otp: otp,
            };
        } catch (error: any) {
            if (error.name === "ZodError") {
                const errorMessages = error.errors.map(
                    (err: any) => `${err.path.join(".")}: ${err.message}`,
                );
                return {
                    status: false,
                    message: `Validation failed: ${errorMessages.join(", ")}`,
                };
            }
            return {
                status: false,
                message: error.message || "Failed to send OTP",
            };
        }
    }

    async verifyOtp(email: string, otp: string) {
        try {
            logger.info("[OTP_SERVICE] Verifying OTP", { email });

            // For testing, check in memory
            const stored = this.storage.get(email);
            console.log(`[OTP_VERIFY] Email: ${email}, Stored:`, stored);

            if (!stored) {
                logger.warn(
                    "[OTP_SERVICE] OTP verification failed - expired or not sent",
                    { email },
                );
                throw new Error("OTP expired or not sent");
            }

            if (otp === stored.otp) {
                this.storage.delete(email);
                logger.info("[OTP_SERVICE] OTP verified successfully", {
                    email,
                });
                return {
                    status: true,
                    message: "OTP verified successfully",
                };
            }

            logger.warn("[OTP_SERVICE] OTP verification failed - invalid code", {
                email,
            });
            return {
                status: false,
                message: "Invalid OTP",
            };
        } catch (error: any) {
            if (error.name === "ZodError") {
                const errorMessages = error.errors.map(
                    (err: any) => `${err.path.join(".")}: ${err.message}`,
                );
                return {
                    status: false,
                    message: `Validation failed: ${errorMessages.join(", ")}`,
                };
            }

            return {
                status: false,
                message: error.message || "Failed to verify OTP",
            };
        }
    }

    async deleteOtp(email: string) {
        try {
            this.storage.delete(email);
            return {
                status: true,
                message: "OTP deleted successfully",
            };
        } catch (error: any) {
            if (error.name === "ZodError") {
                const errorMessages = error.errors.map(
                    (err: any) => `${err.path.join(".")}: ${err.message}`,
                );
                return {
                    status: false,
                    message: `Validation failed: ${errorMessages.join(", ")}`,
                };
            }
            return {
                status: false,
                message: error.message || "Failed to delete OTP",
            };
        }
    }
}
export default new OTPservice();
