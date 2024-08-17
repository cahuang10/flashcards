'use client';

import {useUser} from '@clerk/nextjs'
import {useState, useEffect} from 'react'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material'

export default function Flashcards(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(()=>{
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'flashcards'), user.id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            }
            else {
                await setDoc(docRef, {flashcards: []})
            }
        }
        getFlashcards()
    }, [user])
    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcards?${id}`)
    }

    return (<Container maxWidth="100vw">
        <Grid container spacing={3} sx={{mt:4}}>
            {flashcards.map((f, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                    <Card>
                        <CardActionArea onClick={()=>handleCardClick(i)}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {f.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>)
}