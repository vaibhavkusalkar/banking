"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { authFormSchema } from "@/lib/utils";
import { AuthFormProps } from "@/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: AuthFormProps) => {
	const router = useRouter();
  	const [user, setUser] = useState(null);
  	const [isLoading, setisLoading] = useState(false);

  	const formSchema = authFormSchema(type);

  	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
		  email: "",
		  password: "",
		},
  	});

  const onSubmit = async (data: z.infer<typeof formSchema>) =>  {
	setisLoading(true);
	try {
		//Sign up with Appwrite & create plaid token
		if(type === 'sign-up') {
			const newUser = await signUp(data);
			setUser(newUser);
		} else if (type === 'sign-in') {
			const response = await signIn({email: data.email, password: data.password});
			if(response) router.push('/')
		}
	} catch (error) {
		console.log(error)
	} finally {
		setisLoading(false);
	}
  }

  return (
	<section className="auth-form">
	  <header className="flex flex-col gap-5 md:gap-8">
		<Link href="/" className="cursor-pointer flex items-center gap-1">
		  <Image
			src="/icons/logo.svg"
			width={34}
			height={34}
			alt="Horizon Logo"
			className="size [24px] max-xl:size-10"
		  />
		  <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
			&nbsp;Horizon
		  </h1>
		</Link>

		<div className="flex flex-col gap-1 md:gap-3">
		  <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
			{user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
			<p className="text-16 font-normal text-gray-600">
			  {user
				? "Link your Account to get Started"
				: "Please enter your Details"}
			</p>
		  </h1>
		</div>
	  </header>
	  {user ? (
		<div className="flex flex-col gap-4">PlaidLink</div>
	  ) : (
		<>
		  <Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{type === 'sign-up' && (
					<>
						<div className="flex gap-4">
							<CustomFormField
								form={form}
								name="firstName"
								label="First Name"
								placeholder="ex: John"
								autocomplete="given-name"
								autocapitalize="words"
							/>
							<CustomFormField
								form={form}
								name="lastName"
								label="Last Name"
								placeholder="ex: Doe"
								autocomplete="family-name"
								autocapitalize="words"
							/>
						</div>
						<CustomFormField
							form={form}
							name="address"
							label="Address"
							placeholder="Enter your specific address"
						/>
						<div className="flex gap-4">
							<CustomFormField
								form={form}
								name="city"
								label="City"
								placeholder="ex: Brooklyn"
								autocapitalize="words"
							/>
							<CustomFormField
								form={form}
								name="state"
								label="State"
								placeholder="ex: NY"
								autocapitalize="characters"
							/>
							<CustomFormField
								form={form}
								name="postalCode"
								label="Postal Code"
								placeholder="ex: 41101"
								inputmode="numeric"
							/>
						</div>
						<div className="flex gap-4">
							<CustomFormField
								form={form}
								name="dob"
								label="Date of Birth"
								placeholder="YYYY-MM-DD"
							/>
							<CustomFormField
								form={form}
								name="ssn"
								label="SSN"
								placeholder="ex: 124545"
								inputmode="numeric"
							/>
						</div>
					</>
				)}
			  <CustomFormField
				form={form}
				name="email"
				label="E-mail"
				placeholder="Enter your E-mail"
				inputmode="email"
			  />
			  <CustomFormField
				form={form}
				name="password"
				label="Password"
				placeholder="Enter your Password"
				type="password"
				inputmode="password"
			  />
			  <div className="flex flex-col gap-4">
					<Button type="submit" disabled={isLoading} className="form-btn">
					  {isLoading ? (
						<>
						  <Loader2 size={20} className="animate-spin" /> &nbsp;
						  Loading...
						</>
					  ) : type === "sign-in" ? (
						"Sign In"
					  ) : (
						"Sign Up"
					  )}
					</Button>
			  </div>
			</form>
		  </Form>

		  <footer className="flex justify-center gap-1">
				<p className="text-14 font-normal text-gray-600">
					{type === 'sign-in'
						? "Don't have an Account ?"
						: "Already have an Account ?"
					}
				</p>
				<Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
					{type === 'sign-in' ? 'Sign Up' : 'Sign In'}
				</Link>
		  </footer>
		</>
	  )}
	</section>
  );
};

export default AuthForm;
