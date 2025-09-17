import { useLeads } from '../../contexts/LeadsContext';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { LeadStatus } from '../../types/Lead';
import { ConvertLeadDrawer } from '../opportunities/ConvertLeadDrawer';

const leadFormSchema = z.object({
  email: z.email('Invalid email'),
  status: z.enum(['new', 'contacted', 'inProgress']),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export const LeadDrawer = () => {
  const { selectedLead, setSelectedLead, updateLead } = useLeads();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [isConvertDrawerOpen, setIsConvertDrawerOpen] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      email: selectedLead?.email || '',
      status: selectedLead?.status || 'new',
    },
  });

  useEffect(() => {
    if (selectedLead) {
      form.reset({
        email: selectedLead.email,
        status: selectedLead.status,
      });
    }
  }, [selectedLead, form]);

  const closeDrawer = () => {
    setSelectedLead(null);
    setIsEditing(false);
    setSaveSuccess(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const onSubmit = async (data: LeadFormValues) => {
    if (!selectedLead) return;

    setIsSaving(true);
    setSaveSuccess(null);

    try {
      const updatedLead = {
        ...selectedLead,
        email: data.email,
        status: data.status,
      };

      const success = await updateLead(updatedLead);
      setSaveSuccess(success);

      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Drawer
        open={!!selectedLead}
        onOpenChange={closeDrawer}
        direction="bottom"
      >
        <DrawerContent>
          <div className="flex flex-col">
            <DrawerHeader className="border-b">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-xl md:text-2xl font-bold text-center w-full">
                  {selectedLead?.name}
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className="flex flex-col gap-2 items-center m-2">
              <p className="text-md md:text-lg text-gray-700 font-bold">
                {selectedLead?.company}
              </p>
              <div className="space-y-6">
                <div className="flex justify-center gap-8">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Source</p>
                    <p className="font-medium text-gray-800">
                      {selectedLead?.source}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="font-medium text-gray-800">
                      {selectedLead?.score}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 w-full max-w-md mx-auto">
                {isEditing ? (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      {/* Email Field */}
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="email@exemplo.com"
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Status Field */}
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione um status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={LeadStatus.NEW}>
                                      New
                                    </SelectItem>
                                    <SelectItem value={LeadStatus.CONTACTED}>
                                      Contacted
                                    </SelectItem>
                                    <SelectItem value={LeadStatus.INPROGRESS}>
                                      In Progress
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-2 justify-center">
                        <Button
                          type="submit"
                          disabled={isSaving || !form.formState.isDirty}
                          className="bg-blue-800 text-white"
                        >
                          {isSaving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            setIsEditing(false);
                            if (selectedLead) {
                              form.reset({
                                email: selectedLead.email,
                                status: selectedLead.status,
                              });
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-4 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-800">
                        {selectedLead?.email}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-medium text-gray-800">
                        {selectedLead?.status === LeadStatus.NEW
                          ? 'New'
                          : selectedLead?.status === LeadStatus.CONTACTED
                            ? 'Contacted'
                            : 'In Progress'}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button variant="outline" onClick={handleEditClick}>
                        Edit Lead
                      </Button>
                    </div>
                  </div>
                )}

                {saveSuccess === true && (
                  <p className="text-green-600 text-sm text-center">
                    Data updated successfully!
                  </p>
                )}
                {saveSuccess === false && (
                  <p className="text-red-600 text-sm text-center">
                    Error updating data. Please try again.
                  </p>
                )}
              </div>

              <div className="m-4">
                <Button
                  className="bg-blue-800 text-white"
                  onClick={() => {
                    setIsConvertDrawerOpen(true);
                  }}
                >
                  Convert Lead
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <ConvertLeadDrawer
        isOpen={isConvertDrawerOpen}
        onClose={() => {
          setIsConvertDrawerOpen(false);
          setSelectedLead(null);
        }}
      />
    </>
  );
};
