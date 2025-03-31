'use client'

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
    //appearance are used to change the look of the clerk sign/signup page
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as
        string} appearance={{
            layout: {
                socialButtonsVariant: 'iconButton',
                logoImageUrl: '/icons/logo.png' //also adds project name+home page link
            },
            variables: {
                colorBackground: '#15171c',
                colorPrimary: '',
                colorText: 'white',
                colorInputBackground: '#1b1f29',
                colorInputText: 'white',
            }
        }}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    </ClerkProvider>
);

export default ConvexClerkProvider;