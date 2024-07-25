import React, { useState, useEffect, useCallback } from "$veda-ui/react";
import Nav from "$veda-ui-scripts/components/common/nav-wrapper";


let defaultMenuLinks = [
  {
    title: 'Learn',
    to: '/learn'
  },
  {
    title: 'Test story',
    to: '/stories'
  },
];


export default function NavComponent() {
  return <Nav mainNavItems={defaultMenuLinks} />
}