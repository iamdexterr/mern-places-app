import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { placeSchema, type PlaceFormValues } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { useEffect } from "react";
import {
  useCreatePlace,
  useGetPlaceDetails,
  useUpdatePlace,
} from "@/hooks/usePlaces";
import { toast } from "sonner";
import authStore from "@/store/authStore";
import { Loader } from "lucide-react";

const NewPlaces = () => {
  const placeId = useParams().placeId!;

  const queryClient = useQueryClient();
  const { user } = authStore();
  const isEditMode = !!placeId;

  const { data: placeDetails, isLoading: isPlaceLoading } = useGetPlaceDetails({
    placeId,
    enabled: isEditMode,
  });

  if (isEditMode) {
    // identifedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  }

  const placeForm = useForm<PlaceFormValues>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      title: "",
      address: "",
      description: "",
    },
  });

  const createPlaceMutation = useCreatePlace({
    onSuccess: () => {
      toast.success("Place created successfully!");
      placeForm.reset();
    },
  });

  const updatePlaceMutation = useUpdatePlace({
    onSuccess: () => {
      toast.success("Place updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["place-details", placeId] });
    },
  });
  useEffect(() => {
    if (isEditMode && placeDetails) {
      placeForm.reset({
        title: placeDetails?.title,
        address: placeDetails?.address,
        description: placeDetails?.description,
      });
    }
  }, [placeId, isEditMode, placeDetails]);

  const { errors } = placeForm.formState;

  const onSubmit = (values: PlaceFormValues) => {
    if (isEditMode) {
      updatePlaceMutation.mutate({
        placeId,
        title: values.title,
        description: values.description,
      });
      return;
    }
    createPlaceMutation.mutate({
      ...values,
      creator: user?.id,
    });
  };

  if (isPlaceLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader className="w-10 h-10 animate-spin " />;
      </div>
    );
  }

  if (isEditMode && !placeDetails) {
    return (
      <Card className="flex items-center justify-center h-40">
        <h2>Could not find the place!</h2>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2">Add New Place</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={placeForm.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-4">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    placeholder="Evil Rabbit"
                    {...placeForm.register("title")}
                    aria-invalid={!!errors.title}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>
                  <Input
                    disabled={isEditMode}
                    {...placeForm.register("address")}
                    id="address"
                    placeholder="Enter your address"
                    aria-invalid={!!errors.address}
                  />
                </Field>
                {errors.address && (
                  <p className="text-sm text-destructive">
                    {errors.address.message}
                  </p>
                )}
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...placeForm.register("description")}
                    id="description"
                    placeholder="Add a description of the place"
                    className="resize-none"
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button loading={createPlaceMutation.isPending} type="submit">
                Submit
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewPlaces;
