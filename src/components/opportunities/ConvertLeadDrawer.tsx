import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLeads } from '../../contexts/LeadsContext';
import { useOpportunities } from '../../contexts/OpportunitiesContext';
import { OpportunityStage } from '../../types/Opportunity';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const convertLeadFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  stage: z.enum([
    'discovery',
    'proposal',
    'negotiation',
    'closed_won',
    'closed_lost',
  ]),
  amount: z.number().optional(),
  accountName: z.string().min(1, 'Account name is required'),
});

type ConvertLeadFormValues = z.infer<typeof convertLeadFormSchema>;

interface ConvertLeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConvertLeadDrawer = ({
  isOpen,
  onClose,
}: ConvertLeadDrawerProps) => {
  const { selectedLead } = useLeads();
  const { convertLead } = useOpportunities();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);

  const form = useForm<ConvertLeadFormValues>({
    resolver: zodResolver(convertLeadFormSchema),
    defaultValues: {
      name: selectedLead?.name || '',
      stage: 'discovery',
      amount: undefined,
      accountName: '',
    },
  });

  useEffect(() => {
    if (selectedLead) {
      form.setValue('name', selectedLead.name);
    }
  }, [selectedLead, form]);

  const closeDrawer = () => {
    onClose();
    form.reset();
    setSaveSuccess(null);
  };

  const onSubmit = async (data: ConvertLeadFormValues) => {
    if (!selectedLead) return;

    setIsSaving(true);
    setSaveSuccess(null);

    try {
      const success = await convertLead({
        leadId: selectedLead.id,
        name: data.name,
        stage: data.stage,
        amount: data.amount,
        accountName: data.accountName,
      });

      setSaveSuccess(success);

      if (success) {
        setTimeout(() => {
          closeDrawer();
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao converter lead:', error);
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={closeDrawer}>
        <DrawerContent>
          <div className="flex flex-col">
            <DrawerHeader className="border-b">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-xl md:text-2xl font-bold text-center w-full">
                  Convert Lead
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 rounded-full"
                    onClick={closeDrawer}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="flex flex-col gap-2 items-center m-2 mb-8">
              <div className="space-y-4 w-full max-w-md mx-auto">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stage</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a stage" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={OpportunityStage.DISCOVERY}>
                                Discovery
                              </SelectItem>
                              <SelectItem value={OpportunityStage.PROPOSAL}>
                                Proposal
                              </SelectItem>
                              <SelectItem value={OpportunityStage.NEGOTIATION}>
                                Negotiation
                              </SelectItem>
                              <SelectItem value={OpportunityStage.CLOSED_WON}>
                                Closed Won
                              </SelectItem>
                              <SelectItem value={OpportunityStage.CLOSED_LOST}>
                                Closed Lost
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => {
                                const value = e.target.value;
                                field.onChange(
                                  value === '' ? undefined : parseFloat(value)
                                );
                              }}
                              value={
                                field.value === undefined ? '' : field.value
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-center space-x-2">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={closeDrawer}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSaving}
                        className="bg-green-700 text-white"
                      >
                        {isSaving ? 'Converting...' : 'Convert Lead'}
                      </Button>
                    </div>

                    {saveSuccess === true && (
                      <div className="p-3 rounded-md bg-green-50 text-green-800 text-sm">
                        Lead successfully converted to opportunity!
                      </div>
                    )}

                    {saveSuccess === false && (
                      <div className="p-3 rounded-md bg-red-50 text-red-800 text-sm">
                        Failed to convert lead. Please try again.
                      </div>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
