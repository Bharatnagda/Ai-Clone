'use client';

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number'),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^[0-9]+$/, 'OTP must be numeric'),
});

export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  // Phone form
  const {
    register: phoneRegister,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm({
    resolver: zodResolver(phoneSchema),
  });

  // OTP form
  const {
    register: otpRegister,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  // Send OTP logic
  const sendOtp = (data) => {
    setPhoneNumber(data.phone);
    setIsOtpSent(true);
    setTimeout(() => {
      setStep(2);
    }, 1000); // simulate API delay
  };

  // Verify OTP logic
  const verifyOtp = (data) => {
  const enteredOtp = data.otp;
  const masterOtp = '000000';
  const simulatedOtp = '123456'; // the one sent in sendOtp()

  if (enteredOtp === simulatedOtp || enteredOtp === masterOtp) {
    // ✅ Either correct OTP or master OTP
    onOpenChange(false);
    router.push('/dashboard');
  } else {
    alert('Invalid OTP');
  }
};

  return (
    <>
      <Button onPress={onOpen} className="bg-blue-600 text-white">
        Login with Phone
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-center text-lg font-semibold">
                {step === 1 ? 'Enter Your Phone Number' : 'Enter OTP'}
              </ModalHeader>

              <ModalBody>
                {step === 1 && (
                  <form onSubmit={handlePhoneSubmit(sendOtp)} className="space-y-4">
                    <input
                      type="text"
                      placeholder="+91XXXXXXXXXX"
                      {...phoneRegister('phone')}
                      className="w-full p-2 border rounded"
                    />
                    {phoneErrors.phone && (
                      <p className="text-sm text-red-500">{phoneErrors.phone.message}</p>
                    )}
                    <Button type="submit" color="primary" className="w-full">
                      Send OTP
                    </Button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleOtpSubmit(verifyOtp)} className="space-y-4">
                    <p className="text-sm text-gray-500">OTP sent to {phoneNumber}</p>
                    <input
                      type="text"
                      placeholder="6-digit OTP"
                      {...otpRegister('otp')}
                      className="w-full p-2 border rounded"
                    />
                    {otpErrors.otp && (
                      <p className="text-sm text-red-500">{otpErrors.otp.message}</p>
                    )}
                    <Button type="submit" color="primary" className="w-full">
                      Continue
                    </Button>
                  </form>
                )}
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
