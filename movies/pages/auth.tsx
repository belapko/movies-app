import React, {useCallback, useState} from 'react';
import Input from "@/components/input";
import axios from "axios";
import {signIn} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {FaVk, FaGithub} from "react-icons/fa";


const Auth = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/profiles',
            });
        } catch (e) {
            console.log(e);
        }
    }, [email, password])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password,
            });

            login();
        } catch (e) {
            console.log(e)
        }
    }, [email, name, password, login]);


    return (
        <div
            className="relative h-full w-full bg-[url('../public/images/netflixteaser.png')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black h-full w-full sm:bg-opacity-50">
                <nav className='px-12 py-5'>
                    <img src="/images/logo.png" alt="Logo" className='h-12'/>
                </nav>
                <div className='flex justify-center'>
                    <div
                        className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 md:w-3/5 lg:w-2/5 lg:max-w-md md:max-w-sm rounded-md w-full">
                        <h2 className='text-white text-4xl mb-8 font-semibold text-center'>
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className='flex flex-col gap-4'>
                            {variant === 'register' && (
                                <Input id='username' label='Username' type='text' value={name}
                                       onChange={(event: any) => setName(event.target.value)}
                                />
                            )}
                            <Input id='email' label='Email' type='email' value={email}
                                   onChange={(event: any) => setEmail(event.target.value)}
                            />
                            <Input id='password' label='Password' type='password' value={password}
                                   onChange={(event: any) => setPassword(event.target.value)}
                            />
                        </div>
                        <button onClick={variant === 'login' ? login : register}
                                className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition font-semibold'>
                            {variant === 'login' ? 'Login' : 'Sign up'}
                        </button>
                        <div className='flex flex-row items-center gap-6 mt-8 justify-center'>
                            {/*<div*/}
                            {/*    className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'*/}
                            {/*    onClick={() => signIn('vk', {callbackUrl: '/profiles'})}>*/}
                            {/*    <FaVk size={30} color={'#0077FF'}/>*/}
                            {/*</div>*/}
                            <div
                                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
                                onClick={() => signIn('google', {callbackUrl: '/profiles'})}>
                                <FcGoogle size={30}/>
                            </div>
                            <div
                                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
                                onClick={() => signIn('github', {callbackUrl: '/profiles'})}>
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className='text-neutral-500 mt-6 text-center'>
                            {variant === 'login' ? 'First time using?' : 'Already have an account?'}
                            <span className='text-white ml-1 hover:underline cursor-pointer'
                                  onClick={toggleVariant}>{variant === 'login' ? 'Create an account' : 'Login'}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;