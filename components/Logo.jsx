import { CubeIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { NextLink } from '@mantine/next';
import React from 'react'

function Logo() {
    return (
        <Button
            variant="transparent"
            color="dark"
            leftIcon={<CubeIcon className="w-5 h-5" />}
            component={NextLink}
            href="/"
        >
            <span className="select-none text-2xl font-bold hidden sm:block">
                Vaction Rental
            </span>
        </Button>
    )
}

export default Logo;