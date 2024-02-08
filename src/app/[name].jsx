import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import exercises from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
import { useState } from "react";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import { useQuery } from "@tanstack/react-query";
import NewSetInput from "../components/newSetInput";
const exerciseQuery = gql`query exercises( $name: String){
  exercises( name: $name){
      equipment
      instructions
      muscle
      name
  }
}`
export default function ExerciseDetailsScreen() {
  const params = useLocalSearchParams();
const {data, isLoading, error} = useQuery({
  queryKey:['exercises', params?.name],
  queryFn:()=>client.request(exerciseQuery,  {name:params?.name} )
});
  const [isInstExpanded, setIsInstExpanded] = useState(false);
  // const exercise = data?.find((item) => item.name === params.name);

  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    console.log(error)
    return <Text>Failed to load data</Text>
  }
  if (!data) {
    return (
      <View>
        <Text>Exercise not Found</Text>
        <Link href="/">Go Back</Link>
      </View>
    );
  }

  const exercise = data.exercises[0]
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />
      <View style={styles.panel}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseSubtitle}>
          {exercise.muscle.toUpperCase()} | {exercise.equipment.toUpperCase()}
        </Text>
      </View>
      <View style={styles.panel}>
        <Text
          numberOfLines={isInstExpanded ? 0 : 3}
          style={styles.instructions}
        >
          {exercise.instructions}
        </Text>
        <Text
          onPress={() => setIsInstExpanded(!isInstExpanded)}
          style={styles.seeMore}
        >
          {isInstExpanded ? "See less" : "See more"}
        </Text>
      </View>
      <NewSetInput />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  exerciseName: { fontSize: 20, fontWeight: "500" },
  exerciseSubtitle: { color: "dimgray" },

  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  seeMore: {
    alignSelf: "center",
    padding: 10,
    fontWeight: "600",
    color: "gray",
  },
});
